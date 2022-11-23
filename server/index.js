const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
dotenv.config();

//Imports
const {
    notFoundHandler,
    errorHandler
} = require('./middlewares/common/errorHandler');
const userRouter = require('./router/userRouter');
const { checkLogin } = require('./middlewares/common/checkLogin');

//database connection
mongoose
    .connect(process.env.MONGO_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Database connection successful!');
    })
    .catch(err => {
        console.log(err);
    });

//request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

//routing setup
//signup router
app.use('/user', userRouter);

app.get('/', checkLogin, (req, res, next) => {
    console.log(req.body);
    res.json(req.body);
});
//404 not found
app.use(notFoundHandler);

//error handler
app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`App listening to port ${process.env.PORT}`);
});
