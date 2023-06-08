const { gql } = require('@apollo/client');

module.exports = {
    CREATE_CONTEST_MUTATION: gql`
        mutation CreateContest(
            $title: String!
            $description: String!
            $start: String!
            $duration: Int!
            $token: String!
        ) {
            createContest(
                title: $title
                description: $description
                start: $start
                duration: $duration
                token: $token
            ) {
                id
                title
                description
                start
                duration
                status
                message
            }
        }
    `,

    CONTEST_REGISTRATION_MUTATION: gql`
        mutation Registration($id: Int!, $token: String!) {
            registration(id: $id, token: $token) {
                id
                time
                status
                message
            }
        }
    `,

    CREATE_QUESTION_MUTATION: gql`
        mutation CreateQuestion(
            $title: String!
            $description: String!
            $answer: String!
            $marks: Int!
            $privacy: String!
            $options: [String!]!
            $token: String!
        ) {
            createQuestion(
                title: $title
                description: $description
                answer: $answer
                marks: $marks
                privacy: $privacy
                options: $options
                token: $token
            ) {
                id
                title
                description
                answer
                status
                message
            }
        }
    `,

    GET_ALL_CONTEST_QUERY: gql`
        query GetAllContest {
            getAllContest {
                id
                title
                description
                start
                duration
            }
        }
    `,

    GET_CONTEST_QUERY: gql`
        query GetContest($id: Int!) {
            getContest(id: $id) {
                status
                message
                id
                title
                description
                start
                duration
                User {
                    id
                    name
                    email
                }
            }
        }
    `,

    GET_REGISTRATION_STATUS_QUERY: gql`
        query ($id: Int!, $token: String!) {
            getRegistrationStatus(id: $id, token: $token) {
                status
                message
                id
            }
        }
    `
};
