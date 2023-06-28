const { GraphQLObjectType, GraphQLBoolean, GraphQLString } = require('graphql');

module.exports = {
    MessageType: new GraphQLObjectType({
        name: 'UtilityMessage',
        fields: () => ({
            status: { type: GraphQLBoolean },
            message: { type: GraphQLString }
        })
    })
};
