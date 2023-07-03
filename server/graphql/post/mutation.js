const { GraphQLString, GraphQLInt } = require('graphql');
const { PostType, ReactionType, CommentType } = require('./typeDef');
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
                return {
                    status: false,
                    message: error.message
                };
            }
        }
    },

    deletePost: {
        type: PostType,
        args: {
            token: { type: GraphQLString },
            id: { type: GraphQLInt }
        },
        resolve: async (parent, args, ctx, info) => {
            try {
                const { userId } = jwt.verify(args.token, process.env.JWT_SECRET);
                const post = await db.Post.findOne({ where: { UserId: userId, id: args.id } });

                if (post) {
                    await post.destroy();

                    return {
                        status: true,
                        message: 'Post deleted successfully.'
                    };
                } else {
                    throw new Error('Post not found.');
                }
            } catch (error) {
                return {
                    status: false,
                    message: error.message
                };
            }
        }
    },

    createReaction: {
        type: ReactionType,
        args: {
            token: { type: GraphQLString },
            id: { type: GraphQLInt },
            type: { type: GraphQLString }
        },
        resolve: async (parent, args, ctx, info) => {
            try {
                console.log(args);
                const { userId } = jwt.verify(args.token, process.env.JWT_SECRET);
                const reactionOld = await db.Reaction.findOne({
                    where: { PostId: args.id, UserId: userId }
                });
                if (reactionOld) {
                    const update = await db.Reaction.update(
                        { type: args.type },
                        { where: { id: reactionOld.id } }
                    );
                    if (update[0]) {
                        return {
                            status: true,
                            message: 'Reaction updated.'
                        };
                    } else {
                        throw new Error('Reaction update failed.');
                    }
                } else {
                    const reactionNew = await db.Reaction.create({
                        type: args.type,
                        UserId: userId,
                        PostId: args.id
                    });

                    return {
                        status: true,
                        message: 'Reaction created.',
                        ...reactionNew.dataValues
                    };
                }
            } catch (error) {
                return {
                    status: false,
                    message: error.message
                };
            }
        }
    },

    createComment: {
        type: CommentType,
        args: {
            body: { type: GraphQLString },
            id: { type: GraphQLInt },
            token: { type: GraphQLString }
        },
        resolve: async (parent, args, ctx, info) => {
            try {
                const { userId } = jwt.verify(args.token, process.env.JWT_SECRET);
                const comment = await db.Comment.create({
                    body: args.body,
                    UserId: userId,
                    PostId: args.id,
                    time: new Date().getTime().toString()
                });
                return {
                    status: true,
                    message: 'Comment created successfully.',
                    ...comment.dataValues
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
