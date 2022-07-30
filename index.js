const path = require('path');
const express = require('express');
const app = express();
const SocketIO = require('socket.io');
const { Socket } = require('dgram');
//app.use(express.static(path.join(__dirname , '/public/')));


const server=app.listen('3000', function() {
  console.log('Servidor web escuchando en el puerto 3000');
});
const io = SocketIO(server, {
  cors: {
    methods: ["GET", "POST"]
  }
});



io.on('connection',(socket)=>{

  console.log('new conection '+socket.id)
  socket.on('chat_mensaje',(data)=>{
    console.log('chat mensaje')
    console.log(data)

    socket.emit('chat_respuesta','respuesta de socket');
  })

})
