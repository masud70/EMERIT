const { GraphQLString } = require('graphql');
const { MessageType } = require('./typeDef');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const db = require('../../models');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mdmasud.csecu@gmail.com',
        pass: 'icdwxmlvppmejbkw'
    }
});

module.exports = {
    sendFeedback: {
        type: MessageType,
        args: {
            body: { type: GraphQLString },
            token: { type: GraphQLString }
        },
        resolve: async (parent, args, ctx, info) => {
            console.log(args);
            try {
                const { userId } = jwt.verify(args.token, process.env.JWT_SECRET);

                const user = await db.User.findByPk(userId);

                if (user) {
                    const mailOptions = {
                        to: 'mr48447@gmail.com',
                        subject: 'EMerit User Feedback',
                        html: `<div style='background-color: "#dff9fb"; padding: 4px; border: 1px solid gray; border-radius: 2px; overflow: hidden;'>
                            <h1 style='border-bottom: 1px solid gray;'>User Feedback</h1>
                            <div style='font-weight: bold; font-size: 16px; border-bottom: 1px solid gray;'>
                                <p>Name: ${user.name}</p>
                                <p>Username: ${user.username}</p>
                                <p>email: ${user.email}</p>
                            </div>
                            <div style='padding: 2px; width: "100%"; font-size: 15px; display: block;'>${args.body}</div>
                        </div>`
                    };

                    const mail = await transporter.sendMail(mailOptions);

                    if (mail) {
                        return {
                            status: true,
                            message: 'Thank you for your feedback. Your feedback has been recorded.'
                        };
                    } else {
                        throw new Error('There was an error.');
                    }
                } else {
                    throw new Error('There was an error.');
                }
            } catch (error) {
                return {
                    status: false,
                    message: error.message
                };
            }
        }
    }
};
