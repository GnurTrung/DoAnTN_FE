import { SOCKET_EVENTS } from "constants";
import { io } from "socket.io-client";
class BaseSocket {
  constructor(namespace) {
    this.connect(namespace);
  }

  connect = (namespace) => {
    if (!namespace)
      this.socket = io(process.env.REACT_APP_SOCKET_URL, {
        reconnectionDelay: 3000,
        transports: ["websocket", "polling"],
      });
    this.socket.on("connect", () => {
      console.log("Connected!");
    });

    this.socket.on("disconnect", (reason) => {
      console.log("Disconnected!", reason);
    });

    this.socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
  };

  joinRoom = (account) => {
    this.socket.emit(SOCKET_EVENTS.JOIN, account);
  };

  disconnect = () => {
    if (this.socket) {
      this.socket.disconnect();
    }
  };
}

export default BaseSocket;
