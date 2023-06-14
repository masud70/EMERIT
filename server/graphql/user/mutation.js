const { GraphQLString } = require('graphql');
const { MessageType } = require('./typeDef');
const nodemailer = require('nodemailer');
const db = require('../../models');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mdmasud.csecu@gmail.com',
        pass: 'icdwxmlvppmejbkw'
    }
});

module.exports = {
    sendMailOtp: {
        type: MessageType,
        args: {
            email: { type: GraphQLString }
        },
        resolve: async (parent, args, ctx, info) => {
            try {
                const otp = Math.floor(100000 + Math.random() * 900000);
                db.Otp.destroy({ where: { email: args.email } });
                await db.Otp.create({ email: args.email, otp: otp });

                const mailOptions = {
                    from: 'mdmasud.csecu@gmail.com',
                    to: args.email,
                    subject: 'EMerit Email Verification',
                    html:
                        'Your OPT is <h1>' +
                        otp +
                        '</h1>Please use this OTP to proceed registration.'
                };

                const mail = await transporter.sendMail(mailOptions);

                if (mail)
                    return {
                        status: true,
                        message:
                            'An OTP has been sent to ' +
                            args.email +
                            '. Please enter the OTP below.'
                    };
            } catch (error) {
                return {
                    status: false,
                    message: error.message
                };
            }
        }
    },

    verifyOtp: {
        type: MessageType,
        args: {
            email: { type: GraphQLString },
            otp: { type: GraphQLString }
        },
        resolve: async (parent, args, ctx, info) => {
            try {
                const data = db.Otp.findOne({ where: { email: args.email, otp: args.otp } });
                if (!data) throw new Error('Incorrect OTP.');
                else {
                    return {
                        status: true,
                        message: 'OTP verified.'
                    };
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
