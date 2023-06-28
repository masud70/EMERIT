const { gql } = require('@apollo/client');

module.exports = {
    GET_IS_ADMIN: gql`
        query GetIsAdmin($token: String!) {
            getIsAdmin(token: $token) {
                status
                isAdmin
                isSuperAdmin
                message
            }
        }
    `
};
