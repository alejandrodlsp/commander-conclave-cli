import { socket } from "@/socket";
import router from '@/router';

export default {
    namespaced: true,
  
    state: {
        currentRoomId: null,
        messages: [],
        activeUsers: [],
        currentDeckId: null
    },
  
    getters: {
        getMessages: (state) => { return state.messages },
        getUsers: (state) => { return state.activeUsers },
        getCurrentRoom: (state) => { return state.currentRoom },
        getCurrentDeckId: (state) => { return state.currentDeckId }
    },

    actions: {
        checkIfRoomUserExists(){
            // Check if room user exists and return it
        },
        attemptJoinRoom({ dispatch, commit }, roomId) {
            console.log("Attempting join room")

            socket.connect()
            socket.emit("TS_ATTEMPT_JOIN_ROOM", roomId);

            socket.on("TC_CANNOT_JOIN_ROOM", ()  => {
                commit("alerts/setGlobalAlert", "Room is not accepting new players.", { root: true })
                console.log("Could not join room...")

                socket.removeAllListeners();
                socket.disconnect();

                router.replace('/')
            })

            socket.on("TC_JOIN_ROOM", () => {
                console.log("Joined room, binding events")
                dispatch("bindRoom", roomId)
            })
        },
        bindRoom({ commit }, roomId) {
            commit('setCurrentRoomId', roomId);

            socket.on("TC_SYNC_ROOM", (roomData) => {
                console.log("Sync room event")
                commit('setUsers', roomData.users);
            }),

            socket.on("TC_CHAT_MESSAGE", (message) => {
                console.log("Message received: " + message)
                commit('addMessage', message);
            })

            socket.on("TC_START_ROOM", () => {
                console.log("Room start event")
            })
        },
        unbindRoom() {
            console.log("Unbinding room events and disconnecting")

            socket.removeAllListeners("TC_SYNC_ROOM")
            socket.removeAllListeners("TC_CHAT_MESSAGE")
            socket.removeAllListeners("TC_CANNOT_JOIN_ROOM")
            socket.removeAllListeners("TC_START_ROOM")

            socket.disconnect();
        },
        leaveRoom({ dispatch }) {
            console.log("Trying to leave room")

            socket.emit("TS_ATTEMPT_LEAVE_ROOM")
            socket.on("TS_LEAVE_ROOM", () => {
                console.log("Room left")
                dispatch("unbindRoom")
                router.replace('/')
            })
        },
        sendMessage({ commit }, message) {
            console.log("Sending message ", message)
            socket.emit('TS_CHAT_MESSAGE', message);
            commit('addMessage', {
                message: message,
                user: {
                    id: null,
                    username: "Me"
                },
                time: new Date().toLocaleTimeString()
            });
        },
        selectDeck({ commit }, deck) {
            console.log("Selecting deck ", deck)
            commit('setCurrentDeck', deck)
            socket.emit("TS_SELECT_DECK", deck)
        },
        startRoom() {
            console.log("Start room ")
            socket.emit("TS_START_ROOM")
        }
    },

    mutations: {
        setCurrentRoomId(state, roomId) {
            state.currentRoomId = roomId;
        },
        addMessage(state, message) {
            state.messages.push(message);
        },
        setUsers(state, users) {
            state.activeUsers = users;
        },
        setCurrentDeck(state, deckId) {
            state.currentDeckId = deckId;
        }
    }
  }
  