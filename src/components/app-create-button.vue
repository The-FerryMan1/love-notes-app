<script setup>
import { reactive, ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { storeToRefs } from 'pinia';
import { useNoteStore } from '../stores/note';
const {user} = storeToRefs(useAuthStore());
const {createNote} = useNoteStore();





const modal = ref()
const formData = reactive({
    authorId: user.value?.id,
    recipientEmail: null,
    title: null,
    content: null,
    isRead: false,
});
const handleSubmit = async()=>{
    await createNote(formData)

    modal.value.hidePopover()
    formData.recipientEmail = null
    formData.title = null
    formData.content = null
    formData.isRead = false
}

</script>

<template>
    <div>
        <button  popovertarget="createNote" class="flex gap-3 items-center text-md text-nowrap w-auto py-2 px-3 rounded-lg bg-purple-500 text-white hover:scale-[1.1] hover:drop-shadow-xl">Create
            <svg class="size-[1.5rem]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        </button>

        <div ref="modal"  popover id="createNote" class="bg-fuchsia-500 text-white sm:w-1/2 w-full h-full sm:h-[77%] p-10 rounded-md">
            <form @submit.prevent="handleSubmit" action="" class="w-full grid grid-cols-1 gap-y-3">
                 <div class="grid grid-cols-1 gap-y-2" >
                    <label class="text-lg " for="">Recipient email</label>
                    <input v-model="formData.recipientEmail" class="py-2 px-3 rounded-md text-slate-900" type="email" required>
                </div>
                <div class="grid grid-cols-1 gap-y-2">
                    <label class="text-lg " for="">Title</label>
                    <input v-model="formData.title" class="py-2 px-3 rounded-md text-slate-900" type="text" required>
                </div>
               
                <div class="grid grid-cols-1 gap-y-2">
                    <label class="text-lg " for="">Content</label>
                    <textarea v-model="formData.content" class="resize-none w-full p-4 h-[200px] rounded-lg text-slate-900" name="" id="" placeholder="Content here..." required>

                    </textarea>
                </div>
                <button class="py-2 px-3 w-full bg-purple-500 rounded-md hover:opacity-70 text-lg">Submit</button>
                <button popovertarget="createNote" type="button" class="py-2 px-3 w-full bg-red-500 rounded-md hover:opacity-70 text-lg">Cancel</button>
            </form>
        </div>
    </div>
</template>