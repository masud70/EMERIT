const { GraphQLString, GraphQLInt, GraphQLList, GraphQLNonNull } = require('graphql');
const { ContestType, RegistrationType, QuestionType, ResultType } = require('./typeDef');
const jwt = require('jsonwebtoken');
const db = require('../../models');

module.exports = {
    createContest: {
        type: ContestType,
        args: {
            title: { type: GraphQLString },
            description: { type: GraphQLString },
            start: { type: GraphQLString },
            duration: { type: GraphQLInt },
            token: { type: GraphQLString }
        },
        resolve: async (parent, args, ctx, info) => {
            try {
                const decoded = jwt.verify(args.token, process.env.JWT_SECRET);
                const contest = await db.Contest.create({
                    title: args.title,
                    description: args.description,
                    start: args.start,
                    duration: args.duration,
                    UserId: decoded.userId
                });

                return {
                    status: true,
                    message: 'Contest created successfully.',
                    ...contest.dataValues
                };
            } catch (error) {
                return {
                    status: false,
                    message: error.message
                };
            }
        }
    },

    updateContest: {
        type: ContestType,
        args: {
            id: { type: GraphQLInt },
            title: { type: GraphQLString },
            description: { type: GraphQLString },
            start: { type: GraphQLString },
            duration: { type: GraphQLInt },
            questions: { type: GraphQLList(GraphQLString) }
        },
        resolve: async (parent, args, ctx, info) => {
            try {
                if (args.title.length < 2)
                    throw new Error('Title length must be greater than 2 chars.');
                if (parseInt(args.duration) < 10)
                    throw new Error('Duration must be greater than 10 minutes.');
                if (parseInt(args.start) * 1000 <= new Date().getTime())
                    throw new Error('Start time should be future.');

                const updated = await db.Contest.update(
                    {
                        title: args.title,
                        description: args.description,
                        start: args.start,
                        duration: args.duration
                    },
                    { where: { id: args.id } }
                );

                // Update questions
                const contest = await db.Contest.findByPk(args.id);
                const questions = await db.Question.findAll({ where: { id: args.questions } });

                if (contest && questions && updated[0]) {
                    await contest.addQuestions(questions);
                    return {
                        status: true,
                        message: 'Data updated successfully.'
                    };
                } else {
                    throw new Error('Update failed.');
                }
            } catch (error) {
                return {
                    status: false,
                    message: error.message
                };
            }
        }
    },

    createQuestion: {
        type: QuestionType,
        args: {
            title: { type: GraphQLString },
            description: { type: GraphQLString },
            answer: { type: GraphQLString },
            marks: { type: GraphQLInt },
            privacy: { type: GraphQLString },
            options: { type: GraphQLList(GraphQLString) },
            token: { type: GraphQLString }
        },
        resolve: async (parent, args, ctx, info) => {
            console.log(args);
            try {
                const decoded = jwt.verify(args.token, process.env.JWT_SECRET);
                if (args.title.length < 2)
                    throw new Error('Title length must be greater than 2 chars.');
                if (!args.options.includes(args.answer))
                    throw new Error('Answer must be an option.');
                if (args.options.length < 3 || args.options.length > 5)
                    throw new Error('Number of options should be 3 to 5.');

                const question = await db.Question.create({
                    title: args.title,
                    description: args.description,
                    answer: args.answer,
                    marks: args.marks,
                    privacy: args.privacy,
                    UserId: decoded.userId
                });

                const optionArray = args.options.map(el => {
                    return { value: el, QuestionId: question.id };
                });

                const options = await db.Option.bulkCreate(optionArray);

                return {
                    status: true,
                    message: 'Successful.',
                    ...question.dataValues,
                    ...options.dataValues
                };
            } catch (error) {
                return {
                    status: false,
                    message: error.message
                };
            }
        }
    },

    submitAnswer: {
        type: ResultType,
        args: {
            id: { type: GraphQLNonNull(GraphQLInt) },
            token: { type: GraphQLNonNull(GraphQLString) },
            answers: { type: GraphQLNonNull(GraphQLString) }
        },
        resolve: async (parent, args, ctx, info) => {
            try {
                const decoded = jwt.verify(args.token, process.env.JWT_SECRET);
                const ids = args.answers.split('>>::<<')[0].split('<<::>>');
                const values = args.answers.split('>>::<<')[1].split('<<::>>');

                const submissionValues = [];

                for (let i = 0; i < ids.length; i++) {
                    submissionValues.push({
                        ContestId: args.id,
                        UserId: decoded.userId,
                        QuestionId: ids[i],
                        solution: values[i]
                    });
                }

                const x = submissionValues.map(item => {
                    return db.Submission.findOne({
                        where: {
                            ContestId: item.ContestId,
                            UserId: item.UserId,
                            QuestionId: item.QuestionId
                        }
                    }).then(res => {
                        if (res) {
                            return db.Submission.update(
                                { solution: item.solution },
                                {
                                    where: {
                                        ContestId: item.ContestId,
                                        UserId: item.UserId,
                                        QuestionId: item.QuestionId
                                    }
                                }
                            )
                                .then(r => {
                                    return 1;
                                })
                                .catch(error => {
                                    return 0;
                                });
                        } else {
                            return db.Submission.create(item)
                                .then(r => {
                                    return 1;
                                })
                                .catch(error => {
                                    return 0;
                                });
                        }
                    });
                });

                const ret = await Promise.all(x)
                    .then(rr => {
                        return {
                            status: true,
                            message: 'Solutions submitted successfully!',
                            solved: rr.reduce((a, b) => a + b, 0)
                        };
                    })
                    .catch(error => {
                        throw new Error(error.message);
                    });
                return ret;
            } catch (error) {
                return {
                    status: false,
                    message: error.message
                };
            }
        }
    },

    registration: {
        type: RegistrationType,
        args: {
            id: { type: GraphQLInt },
            token: { type: GraphQLString }
        },
        resolve: async (parent, args, ctx, info) => {
            try {
                const decoded = jwt.verify(args.token, process.env.JWT_SECRET);
                const values = {
                    time: (new Date().getTime() / 1000).toString(),
                    UserId: decoded.userId,
                    ContestId: args.id
                };
                console.log(values);
                const registration = await db.Registration.create(values);

                console.log(registration);

                return {
                    status: true,
                    message: 'Registration successful.',
                    ...registration.dataValues
                };
            } catch (error) {
                return {
                    status: false,
                    message: error.message
                };
            }
        }
    }
};
