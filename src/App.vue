<template>
  <div v-if="error">{{error}}</div>
  <div class="navigation">
    <Suspense>
    <template #default>
      <Navbar :user="auth.user" :loggedIn="auth.loggedIn"/>
    </template>
    <template #fallback>
      Loading...
    </template>
  </Suspense>
  </div>
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
// import { useRouter } from 'vue-router'
import { onBeforeMount } from 'vue'
import auth from './firebase/auth'

export default {
  components: {
    Navbar
  },

  setup() {
    // const router = useRouter()
    
    onBeforeMount(() => {
      firebase.auth().onAuthStateChanged((currentUser) => {
        if (!currentUser) {
          // if (window.location.hostname !== 'localhost') {router.replace('/')}
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
          // if (window.location.hostname !== 'localhost') {router.replace('/Home')}
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
  padding: 5px 5px 0;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #FF6300;
}

#navbar {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 4fr;
}

.navigation {
  position: sticky;
  width: 100%;
  z-index: 1;
  background-color: white;
  top: 0;
  left: 0;
}

.v-messages__message {
  color: crimson
}
</style>
