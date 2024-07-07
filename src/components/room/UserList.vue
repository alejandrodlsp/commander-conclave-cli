<template>
    

<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Commander
                </th>
                <th scope="col" class="px-6 py-3">
                    Status
                </th>
            </tr>
        </thead>
        <tbody v-if="users.length > 0">
            <tr 
                v-for="user in users" 
                :key="user.id"
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
                <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    <img class="w-10 h-10 rounded-full" src="https://static-00.iconduck.com/assets.00/profile-circle-icon-2048x2048-cqe5466q.png">
                    <div class="ps-3">
                        <div class="text-base font-semibold">{{ user.username }}</div>
                    </div>  
                </th>
                <td class="px-6 py-4">
                    Kwain
                </td>
                <td class="px-6 py-4">
                    <div class="flex items-center">
                        <div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Ready
                    </div>
                </td>
            </tr>
        </tbody>
        <tbody v-else>
            <tr class="text-center">
                <td colspan="12" class="py-4 text-gray-500 dark:text-gray-400">No users found</td>
            </tr>
        </tbody>
    </table>
</div>
</template>

<script>
export default {
    name: "UserList",
    props: {
        users: Array
    }
}
</script>