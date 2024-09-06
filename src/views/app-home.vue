<script setup>
import { useAuthStore } from '@/stores/auth';
import { useNoteStore } from '../stores/note';
import { storeToRefs } from 'pinia';
import appAuthHeader from '../components/app-auth-header.vue';
import appCardComtainer from '../components/app-card-comtainer.vue';
import { onMounted, onUnmounted, ref } from 'vue';

const {user} = storeToRefs(useAuthStore());
const {memoNotes, getNotes} = useNoteStore();
const notes = ref(null);
onMounted(async()=>{
    notes.value = await getNotes();
    console.log(notes.value)
})

onUnmounted(()=>{
    notes.value = null
})

</script>

<template>
    <appAuthHeader :userProps='user'/>
    <section class="p-4 space-y-5 w-full">
        <h1 class="text-2xl font-semibold tracking-wider">Inbox</h1>
        <div v-if="notes">
             <appCardComtainer :noteses="notes" />
        </div>
       
       
        
    </section>
</template>

<style scoped>

</style>
