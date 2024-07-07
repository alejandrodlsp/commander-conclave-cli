import { io } from "socket.io-client";

const URL = "localhost:3001";
export var socket = io(URL, {
    extraHeaders: {
        authorization: `bearer ${localStorage.token}`
    }
})