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
                    attributes: {
                        include: [
                            [
                                db.sequelize.literal(
                                    '(SELECT COUNT(*) FROM reactions WHERE reactions.PostId = Post.id AND reactions.type = "like")'
                                ),
                                'likes'
                            ],
                            [
                                db.sequelize.literal(
                                    '(SELECT COUNT(*) FROM reactions WHERE reactions.PostId = Post.id AND reactions.type = "dislike")'
                                ),
                                'dislikes'
                            ]
                        ]
                    },
                    include: [
                        {
                            model: db.Comment,
                            order: [['id', 'DESC']],
                            include: [db.User],
                            separate: true
                        },
                        db.User
                    ],
                    order: [['createdAt', 'DESC']]
                });
                const ret = posts.map(item => {
                    return item.dataValues;
                });
                return ret;
            } catch (error) {
                return {
                    status: false,
                    message: error.message
                };
            }
        }
    }
};
