const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLList
} = require('graphql');
const { UserType } = require('../user/typeDef');

module.exports = {
    ContestType: new GraphQLObjectType({
        name: 'Contest',
        fields: () => ({
            id: { type: GraphQLInt },
            title: { type: GraphQLString },
            description: { type: GraphQLString },
            start: { type: GraphQLString },
            duration: { type: GraphQLInt },
            status: { type: GraphQLBoolean },
            message: { type: GraphQLString },
            User: { type: UserType },
            Question: { type: GraphQLList(module.exports.QuestionType) },
            Registration: { type: module.exports.RegistrationType }
        })
    }),

    QuestionType: new GraphQLObjectType({
        name: 'Question',
        fields: () => ({
            id: { type: GraphQLString },
            title: { type: GraphQLString },
            description: { type: GraphQLString },
            answer: { type: GraphQLString },
            marks: { type: GraphQLInt },
            privacy: { type: GraphQLString },
            status: { type: GraphQLString },
            message: { type: GraphQLString },
            Option: { type: module.exports.OptionType }
        })
    }),

    OptionType: new GraphQLObjectType({
        name: 'Option',
        fields: () => ({
            id: { type: GraphQLString },
            value: { type: GraphQLString },
            Question: { type: module.exports.QuestionType }
        })
    }),

    RegistrationType: new GraphQLObjectType({
        name: 'Registration',
        fields: () => ({
            id: { type: GraphQLInt },
            time: { type: GraphQLString },
            status: { type: GraphQLBoolean },
            message: { type: GraphQLString }
        })
    })
};
