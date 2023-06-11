const { GraphQLString } = require('graphql');
const db = require('../../models');
const jwt = require('jsonwebtoken');
const { UserType } = require('./typeDef');

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
    }
};
