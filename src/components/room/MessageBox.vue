<template>
    <form class="max-w-md mx-auto mb-3 mt-10">
        <div class="relative">
            <input type="search" id="default-message" v-model="message"
                class="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Send a message..." required />
            <button 
                @click.prevent="sendMessage"
                class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Send
            </button>
        </div>
    </form>

    <div class="flex flex-col space-y-4 bg-gray-100 border-1 rounded p-5 h-[150%]">
        <div v-for="message in messages" :key="message.id" class="flex items-start gap-2.5">
            <img v-if="!message.user.id" class="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-1.jpg" alt="Jese image">
            <div
                class="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-200 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                <div class="flex items-center space-x-2 rtl:space-x-reverse">
                    <span class="text-sm font-semibold text-gray-900 dark:text-white">{{ message.user.username }}</span>
                    <span class="text-sm font-normal text-gray-500 dark:text-gray-400">{{ message.time }}</span>
                </div>
                <p class="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{{ message.message }}</p>
            </div>
            <img v-if="message.user.id" class="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-1.jpg" alt="Jese image">
        </div>
    </div>
</template>

<script>
export default {
    name: "MessageBox",
    props: {
        messages: {
            type: Array,
            required: true
        }
    },
    emits: ['send'],
    data() {
        return {
            message: ''
        }
    },
    methods: {
        sendMessage() {
            if(this.message.length < 0) {
                return;
            }

            this.$emit("send", this.message);
            this.message = '';
        }
    }
}
</script>