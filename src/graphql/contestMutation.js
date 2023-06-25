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
    `
};
