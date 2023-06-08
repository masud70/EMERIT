const { GraphQLString, GraphQLInt, GraphQLList, GraphQLBoolean } = require('graphql');
const { ContestType, RegistrationType, QuestionType } = require('./typeDef');
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
                    throw new Error('Ansers must be an option.');

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
                console.log(error.message);
                return {
                    status: false,
                    message: error.message
                };
            }
        }
    }
};
