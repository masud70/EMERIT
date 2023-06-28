const { GraphQLString, GraphQLList } = require('graphql');
const jwt = require('jsonwebtoken');
const db = require('../../models');
const { AdminRequestType } = require('./typeDef');

module.exports = {
    getAllPendingRequest: {
        type: new GraphQLList(AdminRequestType),
        args: {
            token: { type: GraphQLString }
        },
        resolve: async (parent, args, ctx, info) => {
            try {
                const { userId } = jwt.verify(args.token, process.env.JWT_SECRET);
                const superAdmin = await db.User.findAll({
                    where: { id: userId, isSuperAdmin: true }
                });
                if (superAdmin) {
                    const requests = await db.AdminRequest.findAll({
                        where: { requestStatus: 'pending' },
                        include: [db.User],
                        order: [['createdAt', 'DESC']]
                    });

                    return requests;
                } else {
                    throw new Error('Unauthorized access tried.');
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
