<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
</script>

<template>
  <div class="flex flex-col justify-between h-screen">
    <AppHeader />
    <router-view />
    <AppFooter  />
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import { onAuthStateChanged, getAuth } from 'firebase/auth'
import { store } from './store'
import router from "./router";

const auth = getAuth()
//monitoring the user's login status
onAuthStateChanged(auth, (user) => {
  if (user) {
        const isAdmin = localStorage.getItem('isAdmin')
        const ordinationId = localStorage.getItem('ordinationId')
        localStorage.setItem('checkLogedUser', user.email)
        localStorage.setItem('currentUid', user.uid)
        store.state.currentUserEmail = user.email
        store.state.currentName = user.displayName
        store.state.currentUid = user.uid
        store.state.adminOrdiantionId = ordinationId
        console.log(store.state.adminOrdiantionId)
        if (isAdmin === 'admin') {
            router.push({ path: '/adminscreen' })
            }
    } else {
        store.state.currentUserEmail = null
        store.state.currentName = null
        store.state.userRole = null
        localStorage.clear()
    }
})


              

export default {
  data() {
    return {
      store,
    }
  },
  components: {
    AppHeader,
    AppFooter
  },
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
