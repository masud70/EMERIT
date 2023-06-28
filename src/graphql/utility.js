const { gql } = require("@apollo/client");

module.exports = {
    //  Queries  //

    //  Mutations    //
    SEND_FEEDBACK: gql`
        mutation SendFeedback($body: String!, $token: String!) {
            sendFeedback(body: $body, token: $token) {
                status
                message
            }
        }
    `
};
