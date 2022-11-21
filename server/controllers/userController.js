const bcrypt = require('bcrypt');
const User = require('../models/People');

//Register user controller
const registerController = async (req, res, next) => {
    let newUser;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const name = req.body.email.split("@")[0];

    newUser = new User({
        ...req.body,
        name: name,
        password: hashedPassword
    });

    console.log(newUser);

    try {
        const result = await newUser.save();
        res.json({
            status: true,
            message: 'User was added successfully!'
        });
    } catch (error) {
        res.json({
            status: false,
            message: 'Unknown error occurred!'
        });
    }
};

module.exports = {
    registerController
};
