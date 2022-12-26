const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
dotenv.config();

//Imports
const {
    notFoundHandler,
    errorHandler
} = require('./middlewares/common/errorHandler');
const userRouter = require('./router/userRouter');
const { checkLogin } = require('./middlewares/common/checkLogin');
const { upload } = require('./middlewares/common/imageUpload');

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
// MySQL connection
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'emerit'
});
app.use((req, res, next) => {
    req.mysql = connection;
    return next();
});

//request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

//avatar upload
app.post('/uploadAvatar', upload.single('avatar'), (req, res, next) => {
    console.log(req.file);
    res.json({
        status: true,
        message: 'Upload successful!'
    });
});

//404 not found
app.use(notFoundHandler);

//error handler
app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`App listening to port ${process.env.PORT}`);
});
