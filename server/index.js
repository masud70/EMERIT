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
const registerRouter = require('./router/registerRouter');
// const loginRouter = require('./router/loginRouter');

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
app.use('/register', registerRouter);
// app.use("/login", loginRouter);

//404 not found
app.use(notFoundHandler);

//error handler
app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`App listening to port ${process.env.PORT}`);
});
