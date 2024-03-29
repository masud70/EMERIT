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

    DELETE_POST: gql`
        mutation DeletePost($token: String!, $id: Int!) {
            deletePost(token: $token, id: $id) {
                status
                message
            }
        }
    `,

    GET_ALL_POST_QUERY: gql`
        query GetAllPost {
            getAllPost {
                id
                body
                time
                likes
                dislikes
                User {
                    id
                    name
                    avatar
                }
                Comments {
                    id
                    body
                    time
                    User {
                        id
                        name
                        avatar
                    }
                }
            }
        }
    `,

    GET_POST_BY_PAGE_QUERY: gql`
        query GetPostByPage($page: Int!) {
            getPostByPage(page: $page) {
                id
                body
                time
                likes
                dislikes
                User {
                    id
                    name
                    avatar
                }
                Comments {
                    id
                    body
                    time
                    User {
                        id
                        name
                        avatar
                    }
                }
            }
        }
    `,

    CREATE_REACTION_MUTATION: gql`
        mutation CreateReaction($token: String!, $id: Int!, $type: String!) {
            createReaction(token: $token, id: $id, type: $type) {
                status
                message
            }
        }
    `,

    CREATE_COMMENT_MUTATION: gql`
        mutation CreateComment($token: String!, $id: Int!, $body: String!) {
            createComment(token: $token, id: $id, body: $body) {
                status
                message
                body
            }
        }
    `
};
