<template>
  
  <div v-if="error">{{error}}</div>
  <Suspense>
    <template #default>
      <Navbar :user="auth.user" :loggedIn="auth.loggedIn"/>
    </template>
    <template #fallback>
      Loading...
    </template>
  </Suspense>
  <router-view v-slot="{ Component }">
    <Suspense>
      <template #default>
      <component :is="Component"/>
      </template>
      <template #fallback>
      Loading...MORE
      </template>
    </Suspense>
  </router-view>
</template>

<script>
import Navbar from './views/Navbar.vue'
import firebase from './firebase/firebase'
import { useRouter } from 'vue-router'
import { onBeforeMount } from 'vue'
import auth from './firebase/auth'

export default {
  components: {
    Navbar
  },

  setup() {
    const router = useRouter()
    
    onBeforeMount(() => {
      firebase.auth().onAuthStateChanged((currentUser) => {
        if (!currentUser) {
          if (window.location.hostname !== 'localhost') {router.replace('/')}
          auth.user = {}
          auth.loggedIn = false
          auth.internal = false
          auth.partner = false
        } 
        else {
          auth.user = currentUser
          auth.loggedIn = true
          if (auth.user.email.split("@")[1] === "everworksinc.com") 
            {auth.internal = true}
          if (auth.user.email.split("@")[1] === "mc-mc.com")
            {auth.partner = true}
          if (window.location.hostname !== 'localhost') {router.replace('/Home')}
        }
      })
    })

    return { auth }
  }
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

#nav {
  padding: 10px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#navbar {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 4fr;
}
</style>
