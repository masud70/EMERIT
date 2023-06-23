const { GraphQLString, GraphQLInt, GraphQLList, GraphQLNonNull } = require('graphql');
const {
    ContestType,
    RegistrationType,
    QuestionType,
    ResultType,
    MessageType
} = require('./typeDef');
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

    updateContestQuestion: {
        type: ContestType,
        args: {
            id: { type: GraphQLInt },
            token: { type: GraphQLString },
            questions: { type: GraphQLList(GraphQLString) }
        },
        resolve: async (parent, args, ctx, info) => {
            try {
                const contest = await db.Contest.findByPk(args.id);
                if (!contest) {
                    throw new Error('Contest not found.');
                }

                const transaction = await db.sequelize.transaction();

                try {
                    const existingQuestions = await contest.getQuestions({ transaction });
                    await contest.removeQuestions(existingQuestions, { transaction });
                    const newQuestions = await db.Question.findAll({
                        where: { id: args.questions }
                    });
                    await contest.addQuestions(newQuestions, { transaction });

                    await transaction.commit();

                    console.log('Done: ', args);

                    return {
                        status: true,
                        message: 'Data updated successfully.'
                    };
                } catch (error1) {
                    await transaction.rollback();
                    throw error1;
                }
            } catch (error) {
                console.log('Error: ', error.message);
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
                const registration = await db.Registration.create(values);

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
    },

    update: {
        type: MessageType,
        args: {
            id: { type: GraphQLInt },
            field: { type: GraphQLString },
            value: { type: GraphQLString },
            token: { type: GraphQLString }
        },
        resolve: async (parent, args, ctx, info) => {
            try {
                const { userId } = jwt.verify(args.token, process.env.JWT_SECRET);
                if (args.field === 'title') {
                    if (args.value.length > 0 && args.value.length < 50) {
                        const updated = await db.Contest.update(
                            { [args.field]: args.value },
                            { where: { id: args.id } }
                        );
                        if (!updated[0]) {
                            throw new Error('There was an error.');
                        }

                        return {
                            status: true,
                            message: 'Title updated successfully.'
                        };
                    } else {
                        throw new Error('Invalid title length.');
                    }
                } else if (args.field === 'description') {
                    if (args.value.length > 0) {
                        const updated = await db.Contest.update(
                            { [args.field]: args.value },
                            { where: { id: args.id } }
                        );
                        if (!updated[0]) {
                            throw new Error('There was an error.');
                        }
                        return {
                            status: true,
                            message: 'Description updated successfully.'
                        };
                    } else {
                        throw new Error('Invalid description length.');
                    }
                } else if (args.field === 'start') {
                    const contest = await db.Contest.findByPk(args.id);
                    if (parseInt(contest.start) * 1000 <= new Date().getTime()) {
                        throw new Error('Start time cannot be updated.');
                    } else if (parseInt(args.value) * 1000 <= new Date().getTime()) {
                        throw new Error('Starting time must be future.');
                    } else {
                        const updated = await db.Contest.update(
                            { [args.field]: args.value },
                            { where: { id: args.id } }
                        );
                        if (!updated[0]) {
                            throw new Error('There was an error.');
                        }
                        return {
                            status: true,
                            message: 'Starting time updated successfully.'
                        };
                    }
                } else if (args.field === 'duration') {
                    if (parseInt(args.value) > 10 && parseInt(args.value) <= 300) {
                        const updated = await db.Contest.update(
                            { [args.field]: parseInt(args.value) },
                            { where: { id: args.id } }
                        );
                        if (!updated[0]) {
                            throw new Error('There was an error.');
                        }

                        return {
                            status: true,
                            message: 'Duration updated successfully.'
                        };
                    } else {
                        throw new Error('Invalid duration.');
                    }
                } else if (args.field === 'privacy') {
                    if (args.value === 'public') {
                        const updated = await db.Contest.update(
                            { [args.field]: args.value },
                            { where: { id: args.id } }
                        );
                        if (!updated[0]) {
                            throw new Error('There was an error.');
                        }
                        return {
                            status: true,
                            message: 'Privacy updated successfully.'
                        };
                    } else if (args.value.substr(0, 7) === 'private') {
                        console.log(args);
                        const password = args.value.split('<<@>>')[1];
                        if (password.length < 3 && password.length > 32) {
                            throw new Error('Invalid password length.');
                        }
                        const updated = await db.Contest.update(
                            { [args.field]: 'private', password: password },
                            { where: { id: args.id } }
                        );
                        if (!updated[0]) {
                            throw new Error('There was an error.');
                        }

                        return {
                            status: true,
                            message: 'Privacy updated successfully.'
                        };
                    } else {
                        throw new Error('Invalid privacy type.');
                    }
                } else {
                    throw new Error('Invalid update type.');
                }
            } catch (error) {
                return {
                    status: false,
                    message: error.message
                };
            }
        }
    }
};
