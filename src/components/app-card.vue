<script setup>
import { computed } from 'vue';

const note = defineProps(['eachNote'])  
const formattedDate = computed(()=>{
    const totalMilliseconds = (note.eachNote?.data?.createdAt?.seconds * 1000) + (note.eachNote?.data?.createdAt?.nanoseconds / 1000000);
    // Convert milliseconds to hours
    const newDate = new Date(totalMilliseconds)
    return newDate.toLocaleTimeString();

})
</script>

<template>
    <div class="w-full h-full group relative bg-fuchsia-500 drop-shadow-lg text-white p-3 rounded-md  group">
        <div v-if="!note.eachNote?.data?.isRead" class="size-[1rem] bg-blue-500 rounded-full absolute top-0 right-0 translate-x-1 -translate-y-1 ring-1 ring-white z-10">
        </div>
        <router-link :to="{name: 'note', params:{id: note.eachNote?.id}}" class="absolute bottom-0 left-0 w-full h-0 bg-white group-hover:h-full transition-all text-purple-500 overflow-hidden flex flex-col justify-center items-center">
            <p>Click to view</p>
        </router-link>
        <h1 class="text-xl mb-5 font-semibold tracking-wider">{{ note.eachNote?.data?.title }}</h1>
        <h3 class="text-sm font-extralight truncate">Author: {{ note.eachNote?.data?.authorId }}</h3>
        <p class="text-sm font-extralight text-slate-200">{{ formattedDate }}</p>
    </div>
</template>