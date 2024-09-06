<script setup>
import appCard from '../components/app-card.vue';

const noteProps = defineProps(['noteses'])
console.log(noteProps.noteses)
</script>

<template>
    <div class="grid sm:grid-cols-4 grid-cols-1 gap-5 w-full h-full p-3">
        <!-- card -->
         <div v-for="note in noteProps.noteses" :key="note?.id">
             <appCard :eachNote="note"/>
         </div>
       
    </div>

</template>