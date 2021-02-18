require('dotenv').config();
const app = require('./app');
const http = require("http");
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
const mongoose = require('mongoose');

// const users = {};

// io.on('connection', socket => {
//     // console.log("ESTE É O VALOR DO SOCKET", socket)
//     if (!users[socket.id]) {
//         users[socket.id] = socket.id;
//     }
//     // console.log(users);
//     socket.emit("yourID", socket.id);
//     io.sockets.emit("allUsers", users);
//     socket.on('disconnect', () => {
//         delete users[socket.id];
//     })

//     socket.on("callUser", (data) => {
//         io.to(data.userToCall).emit('hey', { signal: data.signalData, from: data.from });
//     })

//     socket.on("acceptCall", (data) => {
//         io.to(data.to).emit('callAccepted', data.signal);
//     })

//     socket.on("onStop", (data) => {
//         // console.log("Estes dados são o data",data)
//     })
// });

//Conecção com BD 
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-m7gxb.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

const db = mongoose.connection;
db.on('error', (err) => console.log(err));
db.once('open', () => console.log('Database connected!'));

server.listen(process.env.PORT || 3333, () => console.log(`🚀Executando em http://localhost:${process.env.PORT}`));//local
// server.listen(process.env.PORT || 3333);