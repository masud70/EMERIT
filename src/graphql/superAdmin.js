const { gql } = require('@apollo/client');

module.exports = {
    // Queries
    GET_ALL_PENDING_REQUEST: gql`
        query GetAllPendingRequest($token: String!) {
            getAllPendingRequest(token: $token) {
                id
                requestMessage
                requestStatus
                time
                User {
                    id
                    name
                    avatar
                }
                status
                message
            }
        }
    `,

    // Mutations
    REQUEST_ADMIN: gql`
        mutation AdminRequest($token: String!, $requestMessage: String!) {
            adminRequest(token: $token, requestMessage: $requestMessage) {
                status
                message
            }
        }
    `,

    RESOLVE_ADMIN_REQUEST: gql`
        mutation ResolveAdminRequest($id: Int!, $status: String!, $token: String!) {
            resolveAdminRequest(id: $id, status: $status, token: $token) {
                status
                message
            }
        }
    `
};
