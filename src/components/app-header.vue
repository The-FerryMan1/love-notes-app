<script setup>
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';

const {user} = storeToRefs(useAuthStore());
</script>

<template>

   <header class="flex py-3 px-3 items-center bg-white/30">
        <div v-once class="me-auto sm:ms-10">
            <h1 class="sm:text-xl text-md text-nowrap p-2 font-semibold tracking-wider text-purple-500">Landian notes</h1>
        </div>
        <nav class="ms-auto sm:me-10">
            <ul v-if="!user" class="flex sm:gap-10 gap-3 *:text-sm *:tracking-wider">
                <li class="hover:opacity-50"><router-link :to="{name:'login'}" active-class="text-purple-400 " class="p-2 rounded-md  transition-all">Login</router-link></li>
            </ul>

            
        </nav>
        
   </header>
</template>


