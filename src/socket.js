import { io } from "socket.io-client";

const URL = "localhost:3001";
export var socket = io(URL, {
    extraHeaders: {
        authorization: `bearer ${localStorage.token}`
    }
})
socket.disconnect();

export const connectToRoom = (room) => {
    socket.connect()

    socket.emit("TS_JOIN_ROOM", room);
    return socket
}

export const disconnectRoom = () => {
    socket.removeAllListeners("TC_USER_JOINED_ROOM")
    socket.removeAllListeners("TC_CHAT_MESSAGE")

    socket.disconnect();
}