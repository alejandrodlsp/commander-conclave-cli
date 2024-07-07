<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
        <button class="btn btn-primary" @click="selectNewDeck">Select Deck</button>
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                        Commander Deck
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Color
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                        Sythis commander
                    </th>
                    <td class="px-6 py-4">
                        <button>Load</button>
                    </td>
                </tr>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                        Galea Kindler of Hope
                    </th>
                    <td class="px-6 py-4">
                        <button>Load</button>
                    </td>
                </tr>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                        Enchantment deck
                    </th>
                    <td class="px-6 py-4">
                        <button>Load</button>
                    </td>
                </tr>
                <tr class="border-b border-gray-200 dark:border-gray-700 bg-green-100">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800 bg-green-100">
                        My Token commander
                    </th>
                    <td class="px-6 py-4">
                        <button>Load</button>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                        Best Commander ever
                    </th>
                    <td class="px-6 py-4">
                        <button>Load</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name: "DeckTable",
    methods: {
        ...mapActions("room", ["selectDeck"]),
        selectNewDeck() {
            console.log('select deck 12');
            this.selectDeck(12);
        }
    }
}
</script>