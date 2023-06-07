const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
dotenv.config();

//Imports
const db = require('./models');
const userRouter = require('./router/userRouter');
const contestRouter = require('./router/contestRouter');
const postRouter = require('./router/postRouter');
const { upload } = require('./middlewares/common/imageUpload');
const { errorHandler, notFoundHandler, checkLogin } = require('./middlewares/common');
const { GraphQLObjectType, GraphQLSchema } = require('graphql');
const { graphqlHTTP } = require('express-graphql');

//database connection
// mongoose
//     .connect(process.env.MONGO_CONNECTION_STRING, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     })
//     .then(() => {
//         console.log('Database connection successful!');
//     })
//     .catch(err => {
//         console.log(err);
//     });
// MySQL connection
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'emerit'
});
app.use((req, res, next) => {
    req.mysql = connection;
    req.io = io;
    req.db = db;
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

// QraphQL
const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {}
});
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({})
});
app.use(
    '/graphql',
    graphqlHTTP({
        graphiql: true,
        schema: new GraphQLSchema({
            query: Query,
            mutation: Mutation
        })
    })
);

//routing setup
app.use('/user', userRouter);
app.use('/contest', checkLogin, contestRouter);
app.use('/post', checkLogin, postRouter);
app.get('/', (req, res) => {
    res.json({ status: true, message: 'Welcome' });
});

//avatar upload
app.post('/uploadImage', upload.single('avatar'), (req, res, next) => {
    res.json({
        status: true,
        message: 'Upload successful!',
        path: 'images/' + req.file.filename
    });
});

// let x = 0;
// setInterval(() => {
//     x++;
//     if (x % 10 === 0) {
//         io.emit('toFront', 'From Backend -> ' + x);
//     }
//     console.log(x);
// }, 1000);

io.on('connection', socket => {
    console.log('User connected');
    socket.on('disconnect', () => {
        console.log('User disconnected');
        socket.disconnect();
    });
    // socket.on('toBack', data => {
    //     console.log(data);
    // });
    // let d = 0;
    // setInterval(() => {
    //     socket.emit('test', d);
    //     d++;
    // }, 1000);
});

//404 not found
app.use(notFoundHandler);
//error handler
app.use(errorHandler);

server.listen(process.env.PORT, () => {
    db.sequelize
        .sync({ alter: true })
        .then(() => {
            console.log(
                `\n================================
App listening to port ${process.env.PORT}
Database connection successfully
================================`
            );
        })
        .catch(err => {
            console.log(err.message);
        });
});
