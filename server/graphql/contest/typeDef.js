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
            privacy: { type: GraphQLString },
            password: { type: GraphQLString },
            status: { type: GraphQLBoolean },
            message: { type: GraphQLString },
            User: { type: UserType },
            Questions: { type: GraphQLList(module.exports.QuestionType) },
            Registrations: { type: GraphQLList(module.exports.RegistrationType) }
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
            Options: { type: GraphQLList(module.exports.OptionType) }
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
    }),

    ResultType: new GraphQLObjectType({
        name: 'Result',
        fields: () => ({
            status: { type: GraphQLBoolean },
            message: { type: GraphQLString },
            solved: { type: GraphQLInt },
            correct: { type: GraphQLInt },
            incorrect: { type: GraphQLInt },
            marks: { type: GraphQLInt },
            rank: { type: GraphQLInt }
        })
    }),

    SubmissionType: new GraphQLObjectType({
        name: 'Submission',
        fields: () => ({
            name: { type: GraphQLString },
            UserId: { type: GraphQLString },
            correct: { type: GraphQLInt },
            incorrect: { type: GraphQLInt },
            marks: { type: GraphQLInt },
            rank: { type: GraphQLInt },
            User: { type: UserType }
        })
    }),

    RankListType: new GraphQLObjectType({
        name: 'RankList',
        fields: () => ({
            status: { type: GraphQLBoolean },
            message: { type: GraphQLString },
            me: { type: module.exports.SubmissionType },
            title: { type: GraphQLString },
            Submissions: { type: GraphQLList(module.exports.SubmissionType) }
        })
    }),

    MessageType: new GraphQLObjectType({
        name: 'ContestMessage',
        fields: () => ({
            status: { type: GraphQLBoolean },
            message: { type: GraphQLString }
        })
    })
};
