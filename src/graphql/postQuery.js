const { gql } = require('@apollo/client');

module.exports = {
    CREATE_POST_MUTATION: gql`
        mutation CreatePost($body: String!, $token: String!) {
            createPost(body: $body, token: $token) {
                status
                message
                id
                body
                time
            }
        }
    `,

    GET_ALL_POST_QUERY: gql`
        query GetAllPost {
            getAllPost {
                id
                body
                time
                User {
                    id
                    name
                }
            }
        }
    `
};
