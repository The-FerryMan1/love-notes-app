import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import appHome from '@/views/app-home.vue'
import { storeToRefs } from 'pinia'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
const routes = [
  {
    path: '',
    name: 'home',
    component: appHome,
    meta:{isAuth:true}
  },
  {
    path: '/login',
    name: 'login',
    component: ()=>import('@/views/app-login.vue'),
    meta:{isGuest:true}
  },
  {
    path: '/sent',
    name: 'sent',
    component: ()=>import('@/views/app-sent.vue'),
    meta: {isAuth:true}
  },
  {
    path: '/note/:id',
    name: 'note',
    component: ()=>import('@/views/app-note.vue'),
    meta: {isAuth: true},
    sensitive: true 
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})


const preUser = ()=>{
  return new Promise((resolve, reject)=>{
    const unsub = onAuthStateChanged(getAuth(), (user)=>{
      unsub()
      resolve(user)
    },
    reject
  )
  })
}

router.beforeEach(async(to, from)=>{
  const {user} = storeToRefs(useAuthStore());
  const currentUser = await preUser();
  user.value = {email: currentUser?.email, id:currentUser?.uid};



  if(currentUser && to.meta.isGuest){
      return{name:'home'}
  }
  if(!currentUser && to.meta.isAuth){
      return{name:'login'}
  }



  // if(to.meta.isAuth){
  //   if(await preUser()){

  //   }else{
  //     return { 
  //       name: 'login',
  //       query: {redirect: "home"}
  //     }
  //   }
  // }
  // if(to.meta.isAuth){
  //   if(await preUser()){

  //   }else{
  //     return { 
  //       name: 'login',
  //       query: {redirect: "home"}
  //     }
  //   }
  // }

  
})

export default router
