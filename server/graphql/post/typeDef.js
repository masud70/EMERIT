const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLList
} = require('graphql');
const { UserType } = require('../user/typeDef');

module.exports = {
    PostType: new GraphQLObjectType({
        name: 'Post',
        fields: () => ({
            id: { type: GraphQLInt },
            body: { type: GraphQLString },
            time: { type: GraphQLString },
            User: { type: UserType },
            likes: { type: GraphQLInt },
            dislikes: { type: GraphQLInt },
            Comments: { type: GraphQLList(module.exports.CommentType) },
            status: { type: GraphQLBoolean },
            message: { type: GraphQLString }
        })
    }),

    ReactionType: new GraphQLObjectType({
        name: 'Reaction',
        fields: () => ({
            id: { type: GraphQLString },
            type: { type: GraphQLString },
            User: { type: UserType },
            status: { type: GraphQLBoolean },
            message: { type: GraphQLString }
        })
    }),

    CommentType: new GraphQLObjectType({
        name: 'Comment',
        fields: () => ({
            id: { type: GraphQLString },
            body: { type: GraphQLString },
            time: { type: GraphQLString },
            User: { type: UserType },
            status: { type: GraphQLBoolean },
            message: { type: GraphQLString }
        })
    })
};
