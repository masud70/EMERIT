const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const port = 5000;

app.get('/', (req, res) => {
    res.send('Hello!!');
});

io.on('connection', socket => {
    console.log('A user connected');

    socket.on('send_message', data => {
        console.log('received message in server side', data);
        io.emit('received_message', 'Data from server.');
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Invalid route handler
app.use((req, res, next) => {
    next('Invalid route.');
});

// Error handler
app.use((err, req, res, next) => {
    if (res.headerSent) {
        next('There was a problem!');
    } else {
        if (err.message) {
            res.send(err.message);
        } else {
            res.send('There was an error!');
        }
    }
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
