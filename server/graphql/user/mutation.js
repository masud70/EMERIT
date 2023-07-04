const { GraphQLString } = require('graphql');
const { MessageType, UserType } = require('./typeDef');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../models');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
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
                    from: process.env.EMAIL_ADDRESS,
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
                const data = await db.Otp.findOne({ where: { email: args.email, otp: args.otp } });
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
    },

    registerUser: {
        type: UserType,
        args: {
            email: { type: GraphQLString },
            password: { type: GraphQLString },
            name: { type: GraphQLString }
        },
        resolve: async (parent, args, ctx, info) => {
            try {
                const hashedPassword = await bcrypt.hash(args.password, 10);
                const existingEmail = await db.User.findOne({ where: { email: args.email } });

                if (existingEmail) throw new Error('Email already registered.');
                const newUser = await db.User.create({
                    email: args.email,
                    password: hashedPassword,
                    name: args.name,
                    username: args.email.split('@')[0]
                });

                if (newUser) {
                    return {
                        status: true,
                        message: 'User registered successfully!'
                    };
                } else throw new Error('There was an error.');
            } catch (error) {
                return {
                    status: false,
                    message: error.message
                };
            }
        }
    },

    loginUser: {
        type: UserType,
        args: {
            email: { type: GraphQLString },
            password: { type: GraphQLString }
        },
        resolve: async (parent, args, ctx, info) => {
            try {
                const { email, password } = args;
                const user = await db.User.findOne({ where: { email } });

                if (!user) throw new Error('Invalid email.');

                if (bcrypt.compareSync(password, user.password)) {
                    const token = jwt.sign(
                        {
                            email: email,
                            userId: user.id
                        },
                        process.env.JWT_SECRET,
                        { expiresIn: '7d' }
                    );
                    delete user.dataValues.password;
                    user.dataValues.token = token;
                    return {
                        status: true,
                        message: 'Authentication successful',
                        ...user.dataValues
                    };
                } else throw new Error('Inavalid password.');
            } catch (error) {
                return {
                    status: false,
                    message: error.message
                };
            }
        }
    },

    updateData: {
        type: UserType,
        args: {
            token: { type: GraphQLString },
            field: { type: GraphQLString },
            value: { type: GraphQLString }
        },
        resolve: async (parent, args, ctx, info) => {
            try {
                const { userId } = jwt.verify(args.token, process.env.JWT_SECRET);
                var { field, value } = args;

                const user = await db.User.findByPk(userId);

                if (!user) throw new Error('User not found.');

                if (field === 'password') {
                    value = await bcrypt.hash(value, 10);
                }

                user[field] = value;
                await user.save();

                return {
                    status: true,
                    message: 'Data updated successfully.'
                };
            } catch (error) {
                return {
                    status: false,
                    message: error.message
                };
            }
        }
    }
};
