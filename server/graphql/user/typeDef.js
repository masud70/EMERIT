const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLInt } = require('graphql');

module.exports = {
    UserType: new GraphQLObjectType({
        name: 'User',
        fields: () => ({
            id: { type: GraphQLString },
            name: { type: GraphQLString },
            email: { type: GraphQLString },
            username: { type: GraphQLString },
            avatar: { type: GraphQLInt },
            role: { type: GraphQLBoolean },
            phone: { type: GraphQLString },
            status: { type: GraphQLBoolean }
        })
    })
};
