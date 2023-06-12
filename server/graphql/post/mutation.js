const { GraphQLString } = require('graphql');
const { PostType } = require('./typeDef');
const jwt = require('jsonwebtoken');
const db = require('../../models');

module.exports = {
    createPost: {
        type: PostType,
        args: {
            token: { type: GraphQLString },
            body: { type: GraphQLString }
        },
        resolve: async (parent, args, ctx, info) => {
            try {
                console.log(args);
                const decoded = jwt.verify(args.token, process.env.JWT_SECRET);
                const post = await db.Post.create({
                    body: args.body,
                    time: new Date().getTime().toString(),
                    UserId: decoded.userId
                });

                return {
                    status: true,
                    message: 'Post created successfully!',
                    ...post.dataValues
                };
            } catch (error) {
                console.log(error);
                return {
                    status: false,
                    message: error.message
                };
            }
        }
    }
};
