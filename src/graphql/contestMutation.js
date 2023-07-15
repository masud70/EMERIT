const { gql } = require('@apollo/client');

module.exports = {
    UPDATE: gql`
        mutation Update($id: Int!, $field: String!, $value: String, $token: String!) {
            update(id: $id, field: $field, value: $value, token: $token) {
                status
                message
            }
        }
    `,

    DELETE_CONTEST: gql`
        mutation DeleteContest($token: String!, $id: Int!) {
            deleteContest(token: $token, id: $id) {
                status
                message
            }
        }
    `,

    UPDATE_QUESTION: gql`
        mutation UpdateQuestion(
            $id: String!
            $token: String!
            $title: String!
            $description: String!
            $marks: Int!
            $options: [String!]!
            $answer: String!
        ) {
            updateQuestion(
                id: $id
                token: $token
                title: $title
                description: $description
                marks: $marks
                options: $options
                answer: $answer
            ) {
                status
                message
            }
        }
    `,

    DELETE_QUESTION: gql`
        mutation DeleteQuestion($token: String!, $id: String!) {
            deleteQuestion(token: $token, id: $id) {
                status
                message
            }
        }
    `,

    RATING: gql`
        mutation Rating($token: String!, $id: Int!, $value: Int!) {
            rating(token: $token, id: $id, value: $value) {
                status
                message
            }
        }
    `
};
