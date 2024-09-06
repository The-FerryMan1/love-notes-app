<script setup>
import { useAuthStore } from '@/stores/auth';
const {logOutUser} = useAuthStore();

const user = defineProps(['userProps'])
</script>

<template>
     <div class="w-full flex drop-shadow-md bg-white">
        <ul v-if="user" class="flex sm:gap-10 gap-3 *:text-sm *:tracking-wider ms-auto me-10">
                <li class="flex gap-2 items-center hover:opacity-50">
                    <img src="../assets/home.svg" alt="" class="size-[1rem] ">
                    <router-link :to="{name:'home'}" active-class="text-purple-400 " class="p-2 rounded-md text-sm transition-all">Home</router-link>
                </li>
                <li class="flex gap-2 items-center hover:opacity-50">
                    <img src="../assets/sent.svg" alt="" class="size-[1.5rem] ">
                    <router-link :to="{name:'sent'}" active-class="text-purple-400 " class="p-2 rounded-md text-sm transition-all">Sent</router-link>
                </li>
                <li class="flex gap-2 items-center">
                    <img class="size-[1rem] " src="../assets/logout.svg" alt="">
                    <button popovertarget="logoutModal"  class="text-slate-400 hover:opacity-50 text-sm">Logout</button>

                   <div id="logoutModal" popover class=" bg-white drop-shadow-xl rounded-lg sm:w-1/2 w-[90%] p-5 space-y-10">
                        <h2 class="text-lg font-semibold text-center">Are you sure you want to logout?</h2>
                        <div class="flex gap-3 justify-end">
                             <button @click="logOutUser" class="bg-slate-500 text-white py-2 px-3 rounded-lg text-md hover:opacity-50" >Confirm</button>
                            <button popovertarget="logoutModal" class="text-white bg-red-500 py-2 px-3 rounded-lg text-md hover:opacity-50">cancel</button>
                        </div>
                    </div>
                </li>
            </ul>
    </div>

</template>