const { GraphQLString } = require('graphql');
const db = require('../../models');
const jwt = require('jsonwebtoken');
const { UserType, MessageType } = require('./typeDef');

module.exports = {
    getUserInfo: {
        type: UserType,
        args: {
            token: { type: GraphQLString }
        },
        resolve: async (parent, args, ctx, info) => {
            try {
                const decoded = jwt.verify(args.token, process.env.JWT_SECRET);
                const user = await db.User.findOne({
                    where: { id: decoded.userId, isActive: true }
                });
                return {
                    status: true,
                    message: 'Data found!',
                    ...user.dataValues
                };
            } catch (error) {
                return {
                    status: false,
                    message: error.message
                };
            }
        }
    },

    getAvaialability: {
        type: MessageType,
        args: {
            id: { type: GraphQLString },
            value: { type: GraphQLString }
        },
        resolve: async (parent, args, ctx, info) => {
            try {
                const data = await db.User.findOne({ where: { [args.id]: args.value } });

                if (data)
                    return {
                        status: true,
                        message: 'Data found.'
                    };
                throw new Error('No data found.');
            } catch (error) {
                return {
                    status: false,
                    message: error.message
                };
            }
        }
    }
};
