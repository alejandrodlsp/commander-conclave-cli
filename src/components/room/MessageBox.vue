<template>
    <div class="flex flex-col items-center justify-center w-[20rem] min-h-[56rem] text-gray-800 mt-10">
        <div class="flex flex-col flex-grow w-full bg-white shadow-xl rounded-lg overflow-hidden">
            <div class="flex flex-col  w-full flex-grow h-0 p-4 overflow-auto">
                <div  v-for="message in messages" :key="message.id" :class="{ 'justify-end': message.user.id}" class="flex w-full mt-2 space-x-3 max-w-xs">
                    <div v-if="!message.user.id" class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"><img src="https://static-00.iconduck.com/assets.00/profile-circle-icon-2048x2048-cqe5466q.png"/></div>
                    <div>
                        <div class="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                            <b>{{ message.user.username }}</b>
                            <p class="text-sm">{{ message.message }}</p>
                        </div>
                        <span class="text-xs text-gray-500 leading-none">{{ message.time }}</span>
                    </div>
                    <div v-if="message.user.id" class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"><img src="https://static-00.iconduck.com/assets.00/profile-circle-icon-2048x2048-cqe5466q.png"/></div>
                </div>
            </div>
            
            <div class="bg-gray-300 p-4">
                <input v-model="message" v-on:keyup.enter="sendMessage" class="flex items-center h-10 w-full rounded px-3 text-sm" type="text" placeholder="Type your message…">
            </div>
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