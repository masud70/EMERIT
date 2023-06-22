const { gql } = require('@apollo/client');

module.exports = {
    UPDATE: gql`
        mutation Update($id: Int!, $field: String!, $value: String, $token: String!) {
            update(id: $id, field: $field, value: $value, token: $token) {
                status
                message
            }
        }
    `
};
