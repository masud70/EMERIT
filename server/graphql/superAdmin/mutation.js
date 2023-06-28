const { GraphQLString, GraphQLInt } = require('graphql');
const { AdminRequestType } = require('./typeDef');
const jwt = require('jsonwebtoken');
const db = require('../../models');

module.exports = {
    adminRequest: {
        type: AdminRequestType,
        args: {
            token: { type: GraphQLString },
            requestMessage: { type: GraphQLString }
        },
        resolve: async (parent, args, ctx, info) => {
            try {
                const { userId } = jwt.verify(args.token, process.env.JWT_SECRET);
                const user = await db.User.findByPk(userId);
                if (user) {
                    const newRequestAdmin = await db.AdminRequest.create({
                        requestMessage: args.requestMessage,
                        time: new Date().getTime().toString(),
                        UserId: user.id
                    });

                    return {
                        status: true,
                        message: 'Request submitted successfully.',
                        ...newRequestAdmin.dataValues
                    };
                } else {
                    throw new Error('User not found.');
                }
            } catch (error) {
                return {
                    status: false,
                    message: error.message
                };
            }
        }
    },

    resolveAdminRequest: {
        type: AdminRequestType,
        args: {
            id: { type: GraphQLInt },
            status: { type: GraphQLString },
            token: { type: GraphQLString }
        },
        resolve: async (parent, args, ctx, info) => {
            try {
                const { userId } = jwt.verify(args.token, process.env.JWT_SECRET);
                const superAdmin = await db.User.findAll({
                    where: { id: userId, isSuperAdmin: true }
                });
                if (superAdmin) {
                    const adminRequest = await db.AdminRequest.findByPk(args.id);
                    if (adminRequest) {
                        adminRequest.requestStatus = args.status;
                        await adminRequest.save();

                        const user = await adminRequest.getUser();

                        if (user) {
                            user.isAdmin = args.status === 'accepted' ? true : false;
                            await user.save();

                            return {
                                status: true,
                                message: `Request ${args.status} successfully.`
                            };
                        } else {
                            throw new Error('Associated user not found.');
                        }
                    } else {
                        throw new Error('Request not found.');
                    }
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
