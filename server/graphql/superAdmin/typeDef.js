const { GraphQLObjectType, GraphQLInt, GraphQLString } = require('graphql');
const { UserType } = require('../user/typeDef');

module.exports = {
    AdminRequestType: new GraphQLObjectType({
        name: 'AdminRequest',
        fields: () => ({
            id: { type: GraphQLInt },
            requestMessage: { type: GraphQLString },
            time: { type: GraphQLString },
            requestStatus: { type: GraphQLString },
            status: { type: GraphQLString },
            message: { type: GraphQLString },
            User: { type: UserType }
        })
    })
};
