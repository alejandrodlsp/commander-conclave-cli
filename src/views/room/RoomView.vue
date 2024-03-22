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
                <h4 class="text-2xl font-bold dark:text-white">Active Users</h4>
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
        this.bindRoom(this.id)
    },
    data() {
        return {
        }
    },
    methods: {
        ...mapActions("room", ["sendMessage", 'bindRoom', 'unbindRoom']),

        send(message) {
            this.sendMessage(message);
        }
    }
}
</script>