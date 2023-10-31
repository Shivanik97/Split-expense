<template>
    <div class="m-4 max-w-full p-2 bg-white border border-primary rounded-lg shadow-xl sm:p-8">
        <h1 class="flex justify-center font-bold text-lg">Edit Expense</h1>
        <div class="row">
            <div class="col-md-12 add-card">
                <div class="mb-4">
                    <div class="custom-card-header flex justify-between">
                        <h5 class="mt-6 font-bold text-lg">Expense Details</h5>
                    </div>
                    <div class="mt-6" v-if="expense">
                        <div class="mb-3">
                            <label for="expenseDescription" class="font-semibold">Description</label>
                            <input type="text" id="expenseDescription"
                                class="mt-1 w-full rounded-md border border-secondary p-2" v-model="expense.description" />
                        </div>
                        <div class="mb-3">
                            <label for="payerUserId" class="font-semibold">Payer</label>
                            <select id="payerUserId"
                                class="mt-2 p-2 border border-secondary block text-ellipsis overflow-hidden ... text-gray-900 text-sm rounded-md"
                                v-model="expense.payerUserId">
                                <option value="" disabled>Select a payer</option>
                                <option v-for="email in suggestedEmails" :key="email" :value="email">
                                    {{ email }}
                                </option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="expenseAmount" class="font-semibold">Amount</label>
                            <input type="number" id="expenseAmount"
                                class="mt-1 w-full rounded-md border border-secondary p-2" v-model="expense.amount" />
                        </div>
                        <div class="mb-3">
                            <label for="expenseDate" class="font-semibold">Date</label>
                            <input type="date" id="expenseDate"
                                class="bg-neutral-100 p-2 w-full rounded-md border border-secondary" :value="formattedDate"
                                @input="updateDate" />
                        </div>
                    </div>
                </div>
                <div class="mb-4" v-if="expense">
                    <div class="flex justify-start">
                        <h5 class="font-semibold mb-2">Participants</h5>
                        <button class="add-button border-0 ml-2 pb-1 rounded-pill" @click="addParticipant">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5"
                                class="w-5 fill-primary stroke-secondary">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                            </svg>
                        </button>
                    </div>
                    <div class="">
                        <div>
                            <table class="table-fixed">
                                <thead>
                                    <tr>
                                        <th class="font-medium">Name</th>
                                        <th class="font-medium">Share</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(participant, index) in expense.participants" :key="index">
                                        <td>
                                            <select :id="`participantName${index}`"
                                                class="border border-secondary text-ellipsis overflow-hidden ... text-gray-900 text-sm rounded-md p-2 w-full"
                                                v-model="participant.userId">
                                                <option value="" disabled>Select a payer</option>
                                                <option v-for="email in suggestedEmails" :key="email" :value="email">{{
                                                    email }}</option>
                                            </select>
                                        </td>
                                        <td>
                                            <div class="ml-2 inline-flex items-center">
                                                <input :id="`participantShare${index}`"
                                                    class="border border-secondary text-ellipsis overflow-hidden ... text-gray-900 text-sm rounded-md p-2 w-full"
                                                    v-model="participant.share" />
                                                <button @click="removeParticipant(index)" class="cancel-icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                        stroke-width="1.5" class="w-6 h-6 stroke-secondary ">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="flex justify-center mt-2">
                            <button
                                class="cursor-pointer rounded-[4px] mt-2 bg-primary px-3 py-[6px] text-center font-semibold text-white"
                                @click="updateExpense">
                                Update Expense
                            </button>
                            <button
                                class="cursor-pointer rounded-[4px] mt-2 ml-2 bg-primary px-3 py-[6px] text-center font-semibold text-white"
                                @click="cancelExpense">
                                Cancel
                            </button>
                            <router-link to="/ViewComponent"
                                class="cursor-pointer rounded-[4px] mt-2 ml-2 bg-primary px-3 py-[6px] text-center font-semibold text-white">
                                Back
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-grid gap-2 col-2 mx-auto"></div>
    </div>
</template>
  
 
<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { useToast } from 'vue-toastification'
import { useRouter, useRoute } from 'vue-router'
import axiosInstance from '../services/api'
import type { GetTransactionData } from '../models/model'

const expense = ref<GetTransactionData | null>(null)
const suggestedEmails = ref<string[]>([])
const toast = useToast()
const router = useRouter()
const route = useRoute()
const formattedDate = ref<string>('')

const fetchData = async () => {
    try {
        const transactionId = route.params.id
        const response = await axiosInstance.get(`/transaction/${transactionId}`)
        expense.value = response.data

        if (expense.value) {
            formattedDate.value = new Date(expense.value.date).toISOString().split('T')[0]
        }
    } catch (error) {
        console.error('Error fetching transaction data:', error)
    }
}

const cancelExpense = () => {
    if (expense.value) {
        expense.value.description = ''
        expense.value.amount = 0
        expense.value.payerUserId = ''
        expense.value.isArchived = false
        expense.value.date = ''
        expense.value.participants = [
            {
                userId: '',
                share: 0,
                profilePicture: ''
            }
        ]
        formattedDate.value = ''
    }
}

const addParticipant = () => {
    if (expense.value?.participants) {
        expense.value.participants.push({
            userId: '',
            share: 0,
            profilePicture: ''
        })
    }
}

const removeParticipant = (index: number) => {
    if (expense.value?.participants) {
        expense.value.participants.splice(index, 1)
    }
}

const updateDate = (event: Event) => {
    if (expense.value) {
        expense.value.date = (event.target as HTMLInputElement).value
    }

    formattedDate.value = (event.target as HTMLInputElement).value
}


const updateShares = () => {
    if (expense.value && expense.value.participants) {
        const numParticipants = expense.value.participants.length;
        if (numParticipants > 0) {
            const equalShare = expense.value.amount / numParticipants;
            expense.value.participants.forEach((participant) => {
                participant.share = equalShare;
            });
        }
    }
};

// Watch for changes in expense amount
watch(expense, (newExpense) => {
    if (newExpense) {
        updateShares();
    }
    // Recalculate shares if expense.amount changes
    watch(() => expense.value?.amount, () => {
        updateShares();
    });
});


const updateExpense = async () => {
    if (expense.value) {
        try {
            const transactionId = route.params.id
            const postData = expense.value
            const response = await axiosInstance.put(`/editTransaction/${transactionId}`, postData)
            toast.success('Transaction updated successfully!')
            router.push('/ViewComponent')
        } catch (error) {
            toast.error('Transaction could not be updated')
            console.error('Error updating expense:', error)
        }
    }
}

const getSuggestedEmails = async () => {
    try {
        const response = await axiosInstance.get('/getSuggestedEmails')
        suggestedEmails.value = response.data
    } catch (error) {
        console.error('Error fetching suggested emails:', error)
    }
}

onMounted(() => {
    fetchData()
    getSuggestedEmails()
})
</script>
  
<style scoped></style>