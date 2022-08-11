const path = require("path");
const express = require("express");
const app = express();
const SocketIO = require("socket.io");
const { Socket } = require("dgram");
require("dotenv").config();
const mysql = require("mysql");
//app.use(express.static(path.join(__dirname , '/public/')));
const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});



const server = app.listen("3000", function () {
  console.log(`Creando Servicio websocket 3000 `);
});

const io = SocketIO(server, {
  cors: {
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("new conection " + socket.id);
  socket.on("chat_mensaje", (data) => {
    console.log("chat mensaje");
    console.log(data);

    /* 
    {
        proyecto: {
          id: 1,
          created_at: '2022-08-10T03:00:28.000000Z',
          updated_at: '2022-08-10T03:00:28.000000Z',
          id_create: '["ldgfelipecarrera@gmail.com"]',
          id_collaborate: '[""]',
          nombre: 'proyecto prueba',
          desc: 'prueba de descripción',
          status: 1,
          notas: ''
        },
        session: {
          id: 2,
          name: 'felipe carrera',
          email: 'ldgfelipecarrera@gmail.com',
          email_verified_at: null,
          tipo_usuario: 0,
          created_at: '2022-08-02T00:04:38.000000Z',
          updated_at: '2022-08-02T00:04:38.000000Z'
        },
        message: {
          msj:'fewfewf',
          to:'',
          type:''
      }
  */



      con.connect(function (err) {
        if (err) throw err;
            /// Guarda Mensaje y actualiza mensajes
              var sql = `INSERT INTO chats ( mensaje, id_usuario,name,email, id_proyecto, para, tipo) VALUES ('${data.message.msj}', '${data.session.id}','${data.session.name}','${data.session.email}', '${data.proyecto.id}','${data.message.to}','${data.message.type}')`;
              con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
              });
      });




    socket.emit("chat_respuesta", "respuesta de socket");
  });
});
