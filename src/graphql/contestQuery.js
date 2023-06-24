const { gql } = require('@apollo/client');

module.exports = {
    GET_OVERALL_RANK: gql`
        query GetOverallRank($token: String!) {
            getOverallRank(token: $token) {
                status
                message
                me {
                    name
                    correct
                    incorrect
                    marks
                    rank
                }
                Submissions {
                    name
                    UserId
                    correct
                    incorrect
                    marks
                    rank
                    User {
                        avatar
                    }
                }
            }
        }
    `,

    GET_USER_QUESTIONS: gql`
        query GetUserQuestions($token: String!) {
            getUserQuestions(token: $token) {
                id
                title
                marks
                solveCount
                tried
                isSolved
                User {
                    name
                    username
                }
                status
                message
            }
        }
    `
};
