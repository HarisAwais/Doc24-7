const connectedUsers = [];
const { Server } = require("socket.io");

let connection = null;
class Socket {
  constructor() {
    this.socket = null;
  }
  connect(server) {
    const io = new Server(server, {
      cors: {
        origin: ["*"],
      },
      allowEIO3: true,
    });

    // io.set('origins', '*:*');
    //prior to connection
    io.use(async (socket, next) => {
      try {
        //we get user mongodb id on socket handshake
        const id = socket.handshake.query.id;

        //add userId field to socket object
        socket.userId = id;

        const socketObj = {};

        if (connectedUsers.length <= 0) {
          socketObj[`${id}`] = [socket];

          connectedUsers.push(socketObj);
        }

        next();
      } catch (err) {
        // console.log('Gaya khatam', err);
      }
    });

    io.on("connection", (socket) => {
      console.log("*** connected socket & user ***", {
        socketId: socket.id,
        userId: socket.userId,
      });

      socket.on("chat", async (body) => {
        console.log(body);

        socket.emit("messageDelivered", body);
      });

      this.socket = socket;
    });
  }
  emit(event, data) {
    this.socket.emit(event, data);
  }
  static init(server) {
    if (!connection) {
      connection = new Socket();
      connection.connect(server);
    }
  }
  static getConnection() {
    if (connection) {
      return connection;
    }
  }
}

module.exports = {
  connect: Socket.init,
  connection: Socket.getConnection,
  connectedUsers,
};
