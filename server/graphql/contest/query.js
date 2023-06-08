const { GraphQLString, GraphQLList, GraphQLInt } = require('graphql');
const db = require('../../models');
const jwt = require('jsonwebtoken');
const { ContestType, RegistrationType } = require('./typeDef');

module.exports = {
    getAllContest: {
        type: new GraphQLList(ContestType),
        args: {},
        resolve: async (parent, args, ctx, info) => {
            try {
                const contests = await db.Contest.findAll({ order: [['createdAt', 'DESC']] });
                return contests;
            } catch (error) {
                return [
                    {
                        status: false,
                        message: error.message
                    }
                ];
            }
        }
    },

    getContest: {
        type: ContestType,
        args: {
            id: { type: GraphQLInt }
        },
        resolve: async (parent, args, ctx, info) => {
            try {
                const contest = await db.Contest.findOne({
                    where: { id: args.id },
                    include: ['User', 'Registrations']
                });

                return {
                    status: true,
                    message: 'Data found',
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

    getRegistrationStatus: {
        type: RegistrationType,
        args: {
            id: { type: GraphQLInt },
            token: { type: GraphQLString }
        },
        resolve: async (parent, args, ctx, info) => {
            try {
                const decoded = jwt.verify(args.token, process.env.JWT_SECRET);
                const reg = await db.Registration.findOne({
                    where: { ContestId: args.id, UserId: decoded.userId }
                });

                return {
                    status: true,
                    message: 'Registered!',
                    ...reg.dataValues
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
