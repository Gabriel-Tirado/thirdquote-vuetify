<template>
  <div id="nav">
    <div id="navbar">
      <div>
        <router-link :to="{name: 'Home'}">
          <img src="@/assets/iiiqio.png" >
        </router-link>
      </div>
      <template v-if="loggedIn">
        <div><v-btn @click="coreDrawer = true">Panel Solutions</v-btn></div>
        <div></div>
        <!-- <div><v-btn @click="advDrawer = true">Advanced Controls</v-btn></div> -->
        <div><v-btn @click="authDrawer = true" style="float: right"><v-avatar :src="auth.user.photoURL"/></v-btn></div>
      </template>
      <template v-else>
        <div></div>
        <div></div>
        <div><v-btn @click="authDrawer = true" style="float: right"><v-avatar /></v-btn></div>
      </template>
      
    </div>

    <v-layout>
      <v-navigation-drawer v-model="coreDrawer" temporary style="width: 25%">
      <div v-for="sol in solutions" :key="sol.id">
        <template v-if="sol.public || development">
          <router-link :to="{name: 'Core', params: { url: sol.url }}">
            <SolutionCard @click="coreDrawer = false" :image1="sol.market_image_1" :image2="sol.market_image_2" :title="sol.name"/>
          </router-link>
        </template>
      </div>
    </v-navigation-drawer>
    </v-layout>

    <!-- <it-drawer v-model="advDrawer">
      <SolutionCard :image1="image1" :image2="image2" :title="title"/>
      <router-link :to="{name: 'Budgetary', params: {url: 'test'}}">Budgetary</router-link>
    </it-drawer>
    
    <it-drawer v-model="authDrawer" placement="left">
      <div id="pad" v-if="loggedIn">
        <div id="buffer"></div>
        <router-link :to="{name: 'BudgetaryList'}">
          <v-btn block type="black" outlined @click="authDrawer = false">Budgetary Quotes</v-btn>
        </router-link>
        <div id="buffer"></div>
        <v-btn type="black" block @click="Logout">Logout</v-btn>
      </div>
      <div id="pad" v-else>
        <div id="buffer"></div>
        <v-btn block type="black" outlined @click="Login">Sign in with Google</v-btn>
        <div id="buffer"></div>
        <v-btn block type="black" outlined @click="MicrosoftLogin">Sign in with Microsoft</v-btn>
      </div>
    </it-drawer> -->
    
  </div>
</template>

<script>
import { ref } from 'vue'
import SolutionCard from '@/components/SolutionCard'
import firebase from '@/firebase/firebase'
import { useRouter } from 'vue-router'
import { apiurl } from '@/drf/drfapi'
import auth from '../firebase/auth'

export default {
    name: 'NavbarComp',
    components: {
        SolutionCard
    },
    props: [
      'user',
      'loggedIn',
    ],
    async setup(){
        const coreDrawer = ref(false)
        const advDrawer = ref(false)
        const authDrawer = ref(false)
        const solutions = ref(null)
        const addr = '/solution/'
        const solutionsResponse = await fetch(apiurl.concat(addr))
        const router = useRouter()
        solutions.value = await solutionsResponse.json();
        
        const image1 = ref('https://i.ibb.co/qYcLQNG/backplane-orig.png')
        const image2 = ref('https://i.imgur.com/2g8BOVA.jpeg')
        const title = ref('GuardLogix Burner Management Sytem')
        const provider = new firebase.auth.GoogleAuthProvider()
        const development = ref(false)
        if (window.location.hostname === 'localhost') {development.value = true}
        const Login = () => {
          firebase
            .auth()
            .signInWithPopup(provider)
            .then(data => {
              auth.user = data.user
              auth.loggedIn = true
            })
            .catch(err => alert(err.message))
          authDrawer.value = false
          router.replace('/Home')
        }
        const MicrosoftLogin = () => {
          const provider = new firebase.auth.OAuthProvider('microsoft.com');
          firebase
            .auth()
            .signInWithPopup(provider)
            .then(
              data => {
              auth.user = data.user
              auth.loggedIn = true
            })
            .catch(err => alert(err.message))
          authDrawer.value = false
        }
        const Logout = () => {
          firebase
            .auth()
            .signOut()
            .catch(err => alert(err.message))
          authDrawer.value = false
          router.replace('/Home')
        }
        return { coreDrawer, advDrawer, authDrawer, solutions, image1, image2, title, Login, MicrosoftLogin, Logout, auth, development }
    }
}
</script>

<style>
#buffer {
  margin: 20px;
}
#pad {
  padding: 10px;
}
#vertical-center {
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
</style>