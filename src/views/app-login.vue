<script setup>
import { useAuthStore } from '@/stores/auth';
import { reactive } from 'vue';

const {loginuser} = useAuthStore();


const formData = reactive({
    email: null,
    password: null
})

const handleSubmit = ()=>{
    loginuser(formData);
}
</script>

<template>
    <section class="p-5 flex justify-center items-center">
        <div class="p-5 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-lg sm:flex-row flex flex-col sm:w-[70%] w-full drop-shadow-xl mt-10">
            <form @submit.prevent="handleSubmit" class="p-5 drop-shadow-2xl  text-white sm:w-[80%] w-full h-full grid grid-cols-1 place-items-start space-y-8">
                <h1 class="text-4xl place-self-start font-semibold">Welcome, baby girl!</h1>
                <div class="grid grid-cols-1 gap-4 sel w-[100%]"> 
                    <label class="text-xl" for="email">Email</label>
                    <input id="email" v-model="formData.email" class="w-full py-2 px-3 text-slate-900 rounded-lg" type="email" name="email"  placeholder="Example@gmail.com" autocomplete="email">
                </div>
                <div class="grid grid-cols-1 gap-4 sel w-[100%]">
                    <label class="text-xl" for="password">Password</label>
                    <input id="password" v-model="formData.password" class="w-full py-2 text-slate-900 px-3 rounded-lg" type="password" name="password"  placeholder="*********" autocomplete="current-password">
                </div>
                <button class=" text-center py-2 px-3 bg-purple-400 place-self-center w-1/2 rounded-lg hover:opacity-50 active:outline-red-500 active:outline">Login</button>
            </form>
            <div class="w-full justify-center p-4 hidden sm:flex ">
                <img src="@/assets/business-3d-floating-red-hearts.png" alt="" class="object-contain drop-shadow-2xl">
            </div>
        </div>
    </section>
</template>

