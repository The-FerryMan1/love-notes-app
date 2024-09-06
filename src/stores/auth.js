import { defineStore } from "pinia";
import { ref } from "vue";
import {getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut} from 'firebase/auth'
import { useRouter } from "vue-router";

export const useAuthStore = defineStore('auth', ()=>{
    const router = useRouter();
    const user = ref(null);

    const getUser = async()=>{
        const auth = getAuth();
        let userCache;
        onAuthStateChanged(auth, (current) => {
        if (current) {
            userCache = {email:current.uid, id:current.email}
           user.value = userCache
           return userCache
        } else {
        }
        }); 
        
    }

  

    const loginuser = async(emailAndPass)=>{
        const auth = getAuth();
        try {
         const res = await signInWithEmailAndPassword(auth, emailAndPass.email, emailAndPass.password)
         const userCache = {email:res.user.email, id:res.user.uid};
         user.value = userCache;
         router.push({name:'home'})
        } catch (error) {
            console.log(error)
        }
        
    }

    const logOutUser = async()=>{
        const auth = getAuth();
        signOut(auth).then(()=>{
            user.value = null;
            router.push({name:'login'})
        }).catch((error)=>{
            console.log(error)
        });
    }

    return {getUser, loginuser, user, logOutUser};
})