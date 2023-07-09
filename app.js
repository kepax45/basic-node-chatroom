const utils = require('./utils')
const express = require('express')
const ejs = require('ejs')
const ejsMate = require('ejs-mate')
const path = require('path'); 
const events = require("events")
const { Server } = require('socket.io');


const io = new Server({
    cors: {
        origin: "*",
    }
});

const eventEmitter = new events.EventEmitter();

io.on("connection", (socket) => {
    socket.emit('msgupdate', utils.getChat())
    eventEmitter.on("update", () => {
        socket.emit("msgupdate", utils.getChat())
    })
})
io.listen(3000)
let app = express()

app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));

app.post('/sendmsg', (req, res) => {
    utils.setChat(req.body)
    eventEmitter.emit("update")
    res.sendStatus(200);
})
app.get('/chatroom', (req, res) => {
    const username = req.query.username;
    const data = {
        value1: username,
    };
    res.render('chat', { data });
})
app.get('', (req, res) => {
    res.render('index');
})

const port = 80
app.listen(port ,'127.0.0.1', () => {
    console.log("Server has started...")
})