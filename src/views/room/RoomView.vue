<template>
    <div class="w-full">
        <div class="mt-10">
            <h2 class="text-4xl font-bold dark:text-white">Room #{{ id }}</h2>
        </div>

        <div class="w-full h-full flex flex-row">
            <div>
                <MessageBox :messages="messages" @send="send" />
            </div>
            
            <div class="ml-10 w-full">
                <div class="flex justify-between">
                    <h4 class="text-2xl font-bold dark:text-white">Active Users</h4>
                    <button 
                        type="button" 
                        class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        @click="tryLeaveRoom()"
                    >
                        Leave Room
                    </button>
                </div>
                <UserList :users="users" class="mt-3"/>
                <DeckTable></DeckTable>
            </div>  
        </div>
    </div>
</template>

<script>
import UserList from '../../components/room/UserList.vue';
import MessageBox from '../../components/room/MessageBox.vue';
import DeckTable from '../../components/room/DeckTable.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'RoomView',
    props: {
        id: {
            type: String,
            required: true
        }
    },
    components: {
        UserList,
        MessageBox,
        DeckTable
    },
    computed: {
        ...mapGetters("room", ["getMessages", "getUsers"]),
        messages() {
            return this.getMessages;
        },
        users() {
            return this.getUsers;
        }
    },
    created() {
        this.attemptJoinRoom(this.id)
    },
    beforeUnmount() {
        this.unbindRoom();
    },
    data() {
        return {
        }
    },
    methods: {
        ...mapActions("room", ["sendMessage", 'attemptJoinRoom', 'unbindRoom', 'leaveRoom']),

        send(message) {
            this.sendMessage(message);
        },
        tryLeaveRoom() {
            this.leaveRoom();
        }
    }
}
</script>