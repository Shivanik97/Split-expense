<template>
    <div class="flex p-8 justify-center">
        <form @submit.prevent="submitForm">
            <div class="w-full p-4 max-w-md bg-white border border-gray-500 rounded-lg shadow-xl sm:p-8">
                <div class="mx-auto bg-white">
                    <div class="flex items-center justify-between">
                        <span class="font-bold text-base text-black">Add Expense</span>
                        <div class="cursor-pointer border rounded-[4px]">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#64748B]" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                    </div>

                    <div class="mt-6">
                        <div class="font-semibold">Enter expense amount</div>
                        <div><input class="mt-1 w-full rounded-[4px] border border-[#A0ABBB] p-2" v-model="formData.amount"
                                type="number" /></div>
                        <div class="font-semibold">What is this expense for?</div>
                        <div><input class="mt-1 w-full rounded-[4px] border border-[#A0ABBB] p-2"
                                v-model="formData.description" type="text" /></div>
                    </div>

                    <div class="mt-6">
                        <div class="font-semibold">Paid by</div>
                        <div class="mt-2">
                            <div class="flex w-full items-center justify-between bg-neutral-100 p-3 rounded-[4px]">
                                <div class="flex items-center gap-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <div>
                                        <select id="names" style="width: 250px"
                                            class="bg-gray-50 border block text-ellipsis overflow-hidden ... border-gray-300 text-gray-900 text-sm rounded-lg p-1"
                                            v-model="selectedEmail">
                                            <option v-for="email in suggestedEmails" :key="email">{{ email }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="mt-6">
                        <div class="font-semibold">Date</div>
                        <div class="mt-2">
                            <div>
                                <input type="date" class="bg-neutral-100 p-3 w-full" v-model="formData.date" />
                            </div>
                        </div>
                    </div>

                    <div class="mt-6">
                        <div class="flex justify-between">
                            <span class="font-semibold text-[#191D23] mr-4">Split between {{ selectedPeople.length }}
                                people</span>
                            <button class="flex cursor-pointer items-center gap-x-1" @click="openAddPeopleDialog">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div class="font-semibold text-gray-500">Add People</div>
                            </button>
                        </div>

                        <div class="flow-root mt-2">
                            <ul role="list" class="">
                                <li class="py-3 sm:py-4" v-for="(participant, index) in selectedPeople" :key="index">
                                    <div class="flex items-center space-x-4">
                                        <input id="checkbox-{{ index }}" type="checkbox" :value="participant"
                                            v-model="selectedPeople"
                                            class="w-4 h-4 text-cyan-200 bg-gray-100 border-gray-300 rounded focus:ring-cyan-200" />
                                        <div class="flex-1 min-w-0">
                                            <p class="text-sm font-medium text-gray-900 truncate">
                                                {{ participant.userId }}
                                            </p>
                                        </div>
                                        <div class="inline-flex items-center text-base font-semibold text-gray-900">
                                            {{ participant.share.toFixed(2) }}
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="mt-6 flex justify-center">
                        <button
                            class="w-full cursor-pointer rounded-[4px] bg-gradient-to-r from-gray-600 to-gray-400 px-3 py-[6px] text-center font-semibold text-white"
                            type="submit">
                            Done</button>
                        <router-link to="/ViewComponent"
                            class="w-full ml-2 cursor-pointer rounded-[4px] bg-gradient-to-r from-gray-600 to-gray-400 px-3 py-[6px] text-center font-semibold text-white"
                            type="submit">
                            Back</router-link>
                    </div>
                </div>
            </div>
        </form>
        <div class="fixed inset-0 flex items-center justify-center z-50" v-if="isAddPeopleModalOpen">
            <div class="absolute inset-0 bg-gray-800 opacity-75" @click="closeAddPeopleDialog"></div>
            <div class="relative bg-white border rounded-lg shadow-xl max-w-md p-8">
                <h2 class="text-xl font-semibold mb-4 ">Add People to Split</h2>
                <div class="bg-gradient-to-r from-gray-300 to-gray-100" v-for="email in suggestedEmails" :key="email">
                    <span class="px-2 cursor-copy" @click="copyEmail(email)">{{ email }} <span
                            class="close-icon  text-black cursor-pointer"
                            @click="removeSuggestion(email)">&times;</span></span>
                </div>
                <input v-model="userIdInput" type="text" placeholder="User ID"
                    class="mt-4 p-2 w-full border border-gray-300 rounded-md" />
                <input v-model="shareInput" type="number" placeholder="Share Value"
                    class="mt-2 p-2 w-full border border-gray-300 rounded-md" />
                <button
                    class="w-full cursor-pointer rounded-[4px] mt-2 bg-gradient-to-r from-gray-600 to-gray-400 px-3 py-[6px] text-center font-semibold text-white"
                    @click="addSelectedPeople">Add Selected</button>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useToast } from 'vue-toastification'
import axiosInstance from '../services/api'

const toast = useToast()
const formData = ref({
    _id: '',
    payerUserId: '',
    description: '',
    amount: 0,
    date: '',
    isArchived: false,
    participants: [
        {
            userId: '',
            share: 0,
            profilePicture: '',
        },
    ],
    __v: 0,
    payerProfilePicture: '',
});

const suggestedEmails = ref([]);
const selectedEmail = ref('You');
const userIdInput = ref('');
const shareInput = ref(0);


interface Participant {
    userId: string;
    share: number;
};
const selectedPeople = ref<Participant[]>([]);

const isAddPeopleModalOpen = ref(false);


const getSuggestedEmails = async () => {
    try {
        const response = await axiosInstance.get('/getSuggestedEmails');
        suggestedEmails.value = response.data;
    } catch (error) {
        console.error('Error fetching suggested emails:', error);
    }
}

const openAddPeopleDialog = () => {
    isAddPeopleModalOpen.value = true;
    isFormReady.value = false;
};
const closeAddPeopleDialog = () => {
    isAddPeopleModalOpen.value = false;
    isFormReady.value = true;
};

const addSelectedPeople = () => {
    const newPerson = {
        userId: userIdInput.value,
        share: 0,
    };
    const numPeople = selectedPeople.value.length;
    const equalShare = formData.value.amount / (numPeople + 1);

    selectedPeople.value.forEach((person) => {
        person.share = equalShare;
    });

    newPerson.share = equalShare;
    selectedPeople.value = [...selectedPeople.value, newPerson];
    userIdInput.value = '';
    shareInput.value = 0;
    closeAddPeopleDialog();
};
const removeSuggestion = (index: number) => {
    suggestedEmails.value.splice(index, 1);
};
const copyEmail = (email: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = email;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
};

const isFormReady = ref(false);

const submitForm = async () => {
    if (!isFormReady.value) {
        return;
    }
    try {
        const postData = {
            description: formData.value.description,
            amount: formData.value.amount,
            payerUserId: selectedEmail.value,
            participants: selectedPeople.value,
            isArchived: formData.value.isArchived,
            date: formData.value.date
        };
        const response = await axiosInstance.post('/addTransaction', postData);
        toast.success('Transaction added successfully!')
        console.log('Response:', response.data);

        formData.value.description = '';
        formData.value.amount = 0;
        selectedEmail.value = '';
        formData.value.isArchived = false;
        selectedPeople.value = [];
        formData.value.date = '';

        isFormReady.value = false;

    } catch (error) {
        toast.error('Failed to create transaction')
        console.error('Error:', error);
    }
};

onMounted(() => {
    getSuggestedEmails();
});
</script>

<style scoped></style>