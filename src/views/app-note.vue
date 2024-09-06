<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useNoteStore } from '../stores/note';
import appAuthHeader from '../components/app-auth-header.vue';

const {getOneDoc, isReadUpdater} = useNoteStore();

const route = useRoute();
const router = useRouter();
const note = ref(null);
onMounted(async()=>{
    await isReadUpdater(route.params.id);
    note.value = await getOneDoc(route.params.id);
})

const goBack = ()=>{
    router.back(-1);
}
</script>


<template>
    <appAuthHeader/>
    <section v-if="note" class="p-5">
        <div>
            <button @click="goBack" class="py-2 px-3 text-md font-light bg-blue-500 text-white rounded-md hover:opacity-50">Back</button>
        </div>
        <div class="my-10">
            <h1 if class="text-4xl font-bold tracking-wider">{{ note.data?.title }}</h1>
            <p class="font-extralight text-sm text-slate-500">{{ note.data?.authorId }}</p>
        </div>

        <div>
            <p class="text-lg">{{ note.data?.content }}</p>
        </div>
    </section>
</template>