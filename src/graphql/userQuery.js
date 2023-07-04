const { gql } = require('@apollo/client');

module.exports = {
    // Queries
    GET_USER_DATA: gql`
        query GetUserInfo($token: String!) {
            getUserInfo(token: $token) {
                id
                name
                email
                username
                avatar
                phone
                country
                status
                message
            }
        }
    `,

    GET_IS_ADMIN: gql`
        query GetIsAdmin($token: String!) {
            getIsAdmin(token: $token) {
                status
                isAdmin
                isSuperAdmin
                message
            }
        }
    `,

    // Mutations
    REGISTER_USER: gql`
        mutation RegisterUser($email: String!, $password: String!, $name: String!) {
            registerUser(email: $email, password: $password, name: $name) {
                status
                message
            }
        }
    `,

    LOGIN_USER: gql`
        mutation LoginUser($email: String!, $password: String!) {
            loginUser(email: $email, password: $password) {
                status
                message
                token
            }
        }
    `,

    UPDATE_DATA: gql`
        mutation UpdateData($token: String!, $field: String!, $value: String!) {
            updateData(token: $token, field: $field, value: $value) {
                status
                message
            }
        }
    `
};
