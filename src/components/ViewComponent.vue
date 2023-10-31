<template>
    <div>
        <nav>
            <div class="flex p-4 mb-1 mt-2 justify-center" id="nav-tab" role="tablist">
                <button
                    class="transform active:scale-75 hover:scale-105 transition-transform mr-2 px-4 font-semibold py-2 text-lg rounded-md"
                    :class="{ 'border border-secondary': isActiveTab('All') }" @click.prevent="activeTab = 'All'">
                    Transactions
                </button>
                <button class="transform active:scale-75 hover:scale-105 transition-transform px-4 font-semibold py-2 text-lg rounded-md"
                    :class="{ 'border border-secondary': isActiveTab('Archived') }" @click.prevent="activeTab = 'Archived'">
                    Archived
                </button>
            </div>
        </nav>
        <div class="tab-pane active" :class="{ 'fade': !isActiveTab('All') }" id="nav-home" role="tabpanel"
            aria-labelledby="nav-home-tab">
        </div>

        <div v-if="isLoading && isActiveTab('All')" class="flex items-center justify-center h-64">
            <div class="w-8 h-8 border-t-2 border-primary border-solid rounded-full animate-spin"></div>
        </div>

        <div v-else-if="isActiveTab('All')" class="mx-auto max-w-screen ">
            <div class="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <div v-for="expense in expenses" :key="expense._id" v-if="isActiveTab('All')"
                    class="w-full shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] p-2 max-w-md bg-white border rounded-lg sm:p-8 transform transition duration-500 hover:scale-105">
                    <div class="flex flex-col items-center md:flex-row justify-evenly mb-4">
                        <img :src="expense.payerProfilePicture" class="mb-2 mr-2 md:mb-0 w-12 rounded-full h-12" />
                        <div class="md:inline-flex">
                            <router-link :to="{ name: 'Update', params: { id: expense._id } }"
                                class="transform transition duration-500 hover:scale-105 border-secondary border hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center">
                                <svg class="w-4 h-4 mr-2 stroke-secondary " xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                </svg>
                                <span>Edit</span>
                            </router-link>
                            <button
                                class="transform transition duration-500 hover:scale-105 ml-4 bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 border-secondary border rounded inline-flex items-center"
                                @click="archiveTransaction(expense._id)">
                                <svg class="w-4 h-4 mr-2 stroke-secondary " xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                </svg>
                                <span>Archive</span>
                            </button>
                            <button v-if="expense.payerUserId === user?.email"
                                class="transform transition duration-500 hover:scale-105 ml-4 bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 border-secondary border rounded inline-flex items-center"
                                @click="userDelete(expense._id, 'expenses')">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" class=" stroke-secondary w-4 h-4 mr-2">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                                <span>Delete</span>
                            </button>
                        </div>
                    </div>
                    <div class="flex flex-wrap">
                        <div
                            class="w-full capitalize h-8 mb-2 px-1 py-1 text-white font-semibold overflow-hidden whitespace-nowrap text-ellipsis rounded-md bg-gradient-to-r from-primary to-secondary">
                            {{ expense.description }} on {{
                                formatDate(expense.date) }}
                        </div>
                        <div
                            class="w-full h-8 px-1 py-1 text-base text-white rounded-md bg-gradient-to-r from-primary to-secondary">
                            Amount: ${{ expense.amount }}

                        </div>
                        <div class="mt-4 font-semibold">Payer: </div>
                        <div class="mt-4 ml-2 rounded-md px-1 text-white text-sm font-semibold bg-[#429186]">
                            {{ expense.payerUserId }}
                        </div>
                    </div>
                    <div class="flex flex-col-reverse sm:flex-row sm:items-center sm:space-x-4 mt-4 min-w-0">
                        <div class="flex-1">
                            <p class="text-lg text-gray-900 font-bold">
                                Participants
                            </p>
                        </div>
                    </div>

                    <ul role="list" class="inline-grid grid-cols-12 ">
                        <li class="py-3 sm:py-4" v-for="(participant, pIndex) in expense.participants" :key="pIndex">
                            <div class="">
                                <img :src="participant.profilePicture" class="ml-1 rounded-xl w-6 h-6" />
                            </div>
                        </li>
                    </ul>

                </div>
            </div>
        </div>

        <div class="tab-pane" :class="{ 'fade': !isActiveTab('Archived') }" id="nav-profile" role="tabpanel"
            aria-labelledby="nav-profile-tab">
        </div>

        <div v-if="isLoading && isActiveTab('Archived')" class="flex items-center justify-center h-64">
            <div class="w-8 h-8 border-t-2 border-primary border-solid rounded-full animate-spin"></div>
        </div>
        <div v-else-if="isActiveTab('Archived')" class="mx-auto max-w-screen px-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <div v-for="expense in Archivedexpenses" :key="expense._id" v-if="isActiveTab('Archived')"
                    class="w-full shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] transform transition duration-500 hover:scale-105 p-3 max-w-md bg-white border rounded-lg sm:p-8 ">
                    <div class="flex flex-col items-center md:flex-row justify-evenly mb-4">
                        <div class="md:inline-flex">
                            <router-link :to="{ name: 'Update', params: { id: expense._id } }"
                                class="transform transition duration-500 hover:scale-105 bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 border-secondary border rounded inline-flex items-center">
                                <svg class="stroke-secondary w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg"
                                    fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                </svg>
                                <span>Edit</span>
                            </router-link>

                            <button v-if="expense.payerUserId === user?.email"
                                class="transform transition duration-500 hover:scale-105 ml-4 bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 border-secondary border rounded inline-flex items-center"
                                @click="userDelete(expense._id, 'expenses')">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" class="stroke-secondary w-4 h-4 mr-2">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                                <span>Delete</span>
                            </button>
                        </div>
                    </div>
                    <div class="flex flex-wrap">
                        <div
                            class="w-full capitalize h-8 text-white mb-2 px-1 py-1 font-semibold overflow-hidden whitespace-nowrap text-ellipsis rounded-md bg-gradient-to-r from-primary to-secondary">
                            {{ expense.description }} on {{
                                formatDate(expense.date) }}
                        </div>
                        <div
                            class="w-full h-8 px-1 py-1 text-base  text-white rounded-md bg-gradient-to-r from-primary to-secondary">
                            Amount: ${{ expense.amount }}

                        </div>
                        <div class="mt-4 font-semibold">Payer: </div>
                        <div class="mt-4 ml-2 rounded-md px-1 text-white font-semibold bg-[#429186]">
                            {{ expense.payerUserId }}
                        </div>
                    </div>
                    <div class="flex flex-col-reverse sm:flex-row sm:items-center sm:space-x-4 mt-4 min-w-0">
                        <div class="flex-1">
                            <p class="text-lg text-gray-900 font-bold">
                                Participants:
                            </p>
                            <div
                                class="flex text-center mt-4 justify-center rounded-md px-1 font-medium text-white bg-gradient-to-r from-primary to-secondary">
                                {{ expense.participants?.map(participant => participant.userId).join(', ') ||
                                    'No Participants'
                                }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import axiosInstance from '../services/api'
import { useAuth0 } from '@auth0/auth0-vue'

const { user } = useAuth0()

interface UserDetails {
    profilePicture: string | undefined
    email: string | undefined
}
let userDetails = ref<UserDetails | null>(null)

export interface Transaction {
    _id: string
    payerUserId: string
    description: string
    amount: number
    date: Date | string
    isArchived: boolean
    payerProfilePicture: string
    participants?: Participant[]
}
type Participant = {
    userId: string
    share: number
    profilePicture: string
}
let isLoading = ref(true);
const activeTab = ref('All');
const isActiveTab = computed(() => (tabName: string) => activeTab.value === tabName);


const expenses = ref<Transaction[]>([])
const Archivedexpenses = ref<Transaction[]>([])

const fetchData = async () => {
    isLoading.value = true
    try {
        const response = await axiosInstance.get('/users/transactions')
        expenses.value = response.data
        // console.log(response.data)
        isLoading.value = false;
    } catch (error) {
        console.error('Error fetching transaction data:', error)
    }
}

const fetchArchivedTransactions = async () => {
    isLoading.value = true
    try {
        const response = await axiosInstance.get('/archived-transactions')
        Archivedexpenses.value = response.data
        console.log(response.data)
    } catch (error) {
        console.error('Error fetching transaction data:', error)
    }
}

const archiveTransaction = async (id: any) => {
    try {
        const response = await axiosInstance.post(`/transactions/${id}/archive`)
        expenses.value = response.data
        fetchData()
    } catch (error) {

        console.error('Error fetching transaction data:', error)
    }
}

// Function to format a date
const formatDate = (date: string | Date) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(date).toLocaleDateString(undefined, options)
}

const userDelete = async (id: any, arrayName: string) => {
    try {
        const response = await axiosInstance.delete(`/transactions/${id}`)
        if (arrayName === 'expenses') {
            expenses.value = expenses.value.filter((expense) => expense._id !== id)
        } else if (arrayName === 'Archivedexpenses') {
            Archivedexpenses.value = Archivedexpenses.value.filter((expense) => expense._id !== id)
        }
    } catch (error) {
        console.error('Error deleting transaction:', error)
    }
}

const fetchUserData = async () => {
    userDetails.value = { profilePicture: user.value?.picture, email: user.value?.email }
    if (user.value) {
        try {
            // console.log(userDetails.value)
            const response = await axiosInstance.post('/createOrGetUser', userDetails.value)
            userDetails.value = response.data
            // console.log(userDetails.value)
            fetchData()
            fetchArchivedTransactions()
        } catch (error) {
            console.error('Error fetching user data:', error)
        }
    }
}

onMounted(() => {
    fetchUserData();
    fetchArchivedTransactions();
})
</script>


<style scoped></style>