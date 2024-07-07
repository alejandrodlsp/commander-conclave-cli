<template>
    <div class="fixed inset-0 z-[998] grid h-screen w-screen bg-opacity-60 place-items-center bg-black backdrop-blur-sm transition-opacity duration-300"
        :class="{ 'bg-opacity-0 hidden pointer-events-none': !show, 'bg-opacity-60 pointer-events-auto': show }">
        <div
            class="relative m-4 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white font-sans text-base font-light leading-relaxed text-blue-gray-500 antialiased shadow-2xl">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                        Create a new Room
                    </h3>
                    <button type="button"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-toggle="crud-modal" @click="close">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <!-- Modal body -->
                <form class="p-4 md:p-5">
                    <div class="grid gap-4 mb-4 grid-cols-2">
                        <div class="col-span-2">
                            <label class="block mb-2 text-sm font-medium dark:text-red-500" :class="{ 'text-red-700' : name_error }">Room name</label>
                            <input
                                type="text" 
                                name="name"
                                id="name"
                                v-model="name"
                                required=""
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                :class="{ 'bg-red-50 border border-red-500 text-red-900 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500' : name_error }" 
                            >
                            <p class="mt-2 text-sm text-red-600 dark:text-red-500">{{ name_error }}</p>
                        </div>
                        <div class="col-span-2">
                            <label class="block mb-2 text-sm font-medium dark:text-red-500" :class="{ 'text-red-700' : players_error }">Max Players</label>
                            <input
                                type="number" 
                                name="players"
                                id="players"
                                min="0" step="1" max="6" v-model="max_players"
                                required=""
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                :class="{ 'bg-red-50 border border-red-500 text-red-900 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500' : players_error }" 
                            >
                            <p class="mt-2 text-sm text-red-600 dark:text-red-500">{{ players_error }}</p>
                        </div>
                        <div class="col-span-2">
                            <label for="description"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Room
                                Description
                            </label>
                            <textarea id="description" rows="4" v-model="description"
                                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Write product description here"></textarea>
                        </div>
                    </div>
                    <button type="submit"
                        @click.prevent="createNewRoom"
                        class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                clip-rule="evenodd"></path>
                        </svg>
                        Create new room
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { securedHttp } from '@/axios';
import { mapMutations } from 'vuex';

export default {
    props: {
        show: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            name: 'New Room',
            max_players: 4,
            description: 'New MTG room',
            name_error: null,
            players_error: null
        }
    },
    methods: {
        ...mapMutations('alerts', ['setGlobalAlert']),

        close() {
            this.name = 'New Room'
            this.max_players = 4
            this.description = 'New MTG room'
            this.name_error = null
            this.players_error = null
            this.$emit('close')
        },

        createNewRoom() {
            if(!this.validateForm()) {
                return;
            }

            const data = {
                name: this.name,
                max_players: this.max_players,
                description: this.description
            }
            securedHttp.post('/rooms', data)
                .then(res => {
                    this.$emit('close')
                    this.$emit('created', res.data)
                })
                .catch(err => {
                    this.name_error = err.response.data.message
                    this.setGlobalAlert(err.response.data.message)
                })

        },

        validateForm() {
            this.name_error = null
            this.players_error = null
            if(this.name.length < 3) {
                this.name_error = 'Room name must be at least 3 characters long'
            }
            if(this.name.length > 25) {
                this.name_error = 'Room name cannot exceed 25 characters'
            }
            if(this.max_players > 4) {
                this.players_error = 'Max players cannot exceed 4'
            }
            if(this.max_players < 2) {
                this.players_error = 'Please select more than 1 player'
            }

            if(this.name_error) { return false }
            if(this.players_error) { return false }
            return true;
        }
    }
}
</script>