import { connectToRoom, disconnectRoom, socket } from "@/socket";

export default {
    namespaced: true,
  
    state: {
        currentRoomId: null,
        messages: [],
        activeUsers: []
    },
  
    getters: {
        getMessages: (state) => { return state.messages },
        getActiveUsers: (state) => { return state.activeUsers }
    },

    actions: {
        bindRoom({ commit }, roomId) {
            commit('setCurrentRoomId', roomId);
            connectToRoom(roomId);

            socket.on("TC_USER_JOINED_ROOM", (user) => {
                commit('addActiveUser', user);
            })

            socket.on("TC_USER_LEFT_ROOM", (user) => {
                commit('removeActiveUser', user);
            })
        
            socket.on("TC_CHAT_MESSAGE", (message) => {
                console.log("Message received: " + message)
                commit('addMessage', message);
            })
        },
        unbindRoom() {
            disconnectRoom();
        },
        sendMessage({ commit }, message) {
            socket.emit('TS_CHAT_MESSAGE', message);
            commit('addMessage', {
                message: message,
                user: {
                    id: null,
                    username: "Me"
                },
                time: new Date().toLocaleTimeString()
            });
        }
    },

    mutations: {
        setCurrentRoomId(state, roomId) {
            state.currentRoomId = roomId;
        },
        addMessage(state, message) {
            state.messages.push(message);
        },
        addActiveUser(state, user) {
            state.activeUsers.push(user);
        },
        removeActiveUser(state, user) {
            state.activeUsers.splice(state.activeUsers.indexOf(user), 1);
        }
    }
  }
  