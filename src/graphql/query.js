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

    UPDATE_CONTEST_MUTATION: gql`
        mutation UpdateContest(
            $id: Int!
            $title: String!
            $description: String!
            $start: String!
            $duration: Int!
            $questions: [String!]!
        ) {
            updateContest(
                id: $id
                title: $title
                description: $description
                start: $start
                duration: $duration
                questions: $questions
            ) {
                status
                message
                id
                title
            }
        }
    `,

    GET_CONTEST_BY_USER_ID_QUERY: gql`
        query GetContestByUserId($token: String!) {
            getContestByUserId(token: $token) {
                id
                title
                description
                start
                duration
                Questions {
                    id
                    title
                }
            }
        }
    `,

    GET_CONTEST_BY_CONTEST_ID_QUERY: gql`
        query GetContestByContestId($id: Int!) {
            getContestByContestId(id: $id) {
                id
                title
                description
                start
                duration
                status
                message
                Questions {
                    id
                    title
                }
                User {
                    id
                    name
                }
            }
        }
    `,

    GET_ALL_QUESTION_BY_USER_ID_QUERY: gql`
        query GetAllQuestionByUserId($token: String!) {
            getAllQuestionByUserId(token: $token) {
                id
                title
                status
                message
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
