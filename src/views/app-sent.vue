<script setup>
import appCreateButton from '../components/app-create-button.vue';
import appAuthHeader from '../components/app-auth-header.vue';
import appCardComtainer from '../components/app-card-comtainer.vue';
import { useNoteStore } from '../stores/note';
import { onMounted, ref } from 'vue';

const {getSentNote} = useNoteStore();
const sentNotes = ref(null);
onMounted(async()=>{
    sentNotes.value = await getSentNote();
})
</script>

<template>
    <appAuthHeader/>
    <section class="p-3">
        <h1 class="text-xl font-semibold mb-4">Sent notes</h1>
        <appCreateButton/>
        <div v-if="sentNotes">
             <appCardComtainer :noteses="sentNotes" />
        </div>

    </section>
</template>