const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLInt } = require('graphql');

module.exports = {
    UserType: new GraphQLObjectType({
        name: 'User',
        fields: () => ({
            id: { type: GraphQLString },
            name: { type: GraphQLString },
            email: { type: GraphQLString },
            username: { type: GraphQLString },
            avatar: { type: GraphQLString },
            role: { type: GraphQLString },
            phone: { type: GraphQLString },
            country: { type: GraphQLString },
            token: { type: GraphQLString },
            status: { type: GraphQLBoolean },
            message: { type: GraphQLString }
        })
    }),

    MessageType: new GraphQLObjectType({
        name: 'Message',
        fields: () => ({
            status: { type: GraphQLBoolean },
            message: { type: GraphQLString }
        })
    }),

    AdminMessageType: new GraphQLObjectType({
        name: 'AdminMessage',
        fields: () => ({
            status: { type: GraphQLBoolean },
            isAdmin: { type: GraphQLBoolean },
            isSuperAdmin: { type: GraphQLBoolean },
            message: { type: GraphQLString }
        })
    })
};
