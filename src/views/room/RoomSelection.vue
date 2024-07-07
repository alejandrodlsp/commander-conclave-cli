<template>
    <div class="p-10 w-full">
        <NewRoomModal :show="showNewRoomModal" @close="showNewRoomModal=false" @created="addNewRoom"/>

        <h4 class="text-2xl font-bold dark:text-white pl-1">Available Rooms:</h4>

        <div class="mt-5 flex items-center justify-between flex-row flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
            <label for="table-search" class="sr-only">Search</label>
            <div class="relative">
                <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input type="text" v-model="roomFilter" id="table-search-users" class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-96 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for rooms">
            </div>
            <div>
                <button 
                    @click="showNewRoomModal = true"
                    type="button"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                    Create Room
                </button>
            </div>
        </div>

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Type
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Players
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody v-if="filteredRooms.length > 0">
                    <tr 
                        class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
                        v-for="room in filteredRooms"
                        :key="room.name"
                    >
                        <th scope="row" class="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <img class="w-10 h-10 rounded-full" src="https://b.thumbs.redditmedia.com/1UCbc0UOhTcu8Yo_xAQUW7tp7CpAiWDVNJGEXLWXvYU.png" alt="Jese image">
                            <div class="ps-3">
                                <div class="text-base font-semibold">{{ room.name }}</div>
                                <div class="font-normal text-gray-500">{{ room.max_players }} players max.</div>
                            </div>
                        </th>
                        <td class="px-6 py-4">
                            Public
                        </td>
                        <td class="px-6 py-4">
                            {{ room.roomUsers?.length }}/{{ room.max_players }}
                        </td>
                        <td class="px-6 py-4">
                            <div class="flex items-center">
                                <div class="h-2.5 w-2.5 rounded-full me-2" :class="statusClass(room)"></div> {{ room.status }}
                            </div>
                        </td>
                        <td class="px-6 py-4">
                            <p
                                @click.prevent="onJoinRoom(room)"
                                class="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                                :class="{'text-gray-600 hover:no-underline cursor-default': !room.canJoin}"
                            >Join Room</p>
                        </td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr >
                        <td colspan="12" class="px-6 py-4 text-center text-gray-500 dark:text-gray-400">No rooms found.</td>
                    </tr>        
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import NewRoomModal from '@/components/room/NewRoomModal.vue'
import { securedHttp } from '@/axios';
import { mapMutations } from 'vuex';

export default {
    name: 'RoomSelection',
    components: {
        NewRoomModal
    },
    data() {
        return {
            showNewRoomModal: false,
            roomFilter: '',
            rooms: [
            ]
        }
    },
    created() {
      this.fetchRooms();  
    },
    computed: {
        filteredRooms() {
            return this.rooms.filter(room => room.name.toLowerCase().includes(this.roomFilter.toLowerCase()));
        },
    },
    methods: {
        ...mapMutations('alerts', ['setGlobalAlert', 'clearGlobalAlerts']),

        addNewRoom(room) {
            this.rooms.push(room);
            this.onJoinRoom(room)
        },

        statusClass(room) {
            return room.status === 'ACTIVE'? 'bg-green-500' : 'bg-red-500';
        },

        fetchRooms() {
            securedHttp.get('/rooms')
                .then(response => {
                    this.rooms = response.data;
                })
                .catch(error => {
                    this.setGlobalAlert(error.message)
                })
        },

        onJoinRoom(room) {
            this.$router.replace({ name: 'roomView', params: { id: room.id }})
        }
    }
}
</script>