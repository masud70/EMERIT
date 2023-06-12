const { PostType } = require('./typeDef');
const db = require('../../models');
const { GraphQLList } = require('graphql');

module.exports = {
    getAllPost: {
        type: new GraphQLList(PostType),
        args: {},
        resolve: async (parent, args, ctx, info) => {
            try {
                const posts = await db.Post.findAll({
                    order: [['createdAt', 'DESC']],
                    include: [db.User, db.Reaction, db.Comment]
                });
                return posts;
            } catch (error) {
                return {
                    status: false,
                    message: error.message
                };
            }
        }
    }
};
