const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLInt } = require('graphql');
const { UserType } = require('../user/typeDef');

module.exports = {
    PostType: new GraphQLObjectType({
        name: 'Post',
        fields: () => ({
            id: { type: GraphQLInt },
            body: { type: GraphQLString },
            time: { type: GraphQLString },
            User: { type: UserType },
            Reactions: { type: module.exports.ReactionType },
            Comments: { type: module.exports.CommentType },
            status: { type: GraphQLBoolean },
            message: { type: GraphQLString }
        })
    }),

    ReactionType: new GraphQLObjectType({
        name: 'Reaction',
        fields: () => ({
            id: { type: GraphQLString },
            type: { type: GraphQLString },
            User: { type: UserType }
        })
    }),

    CommentType: new GraphQLObjectType({
        name: 'Comment',
        fields: () => ({
            id: { type: GraphQLString },
            body: { type: GraphQLString },
            time: { type: GraphQLString },
            User: { type: UserType }
        })
    })
};
