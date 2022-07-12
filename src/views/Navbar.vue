<template>
  <div id="nav">
    <div id="navbar">
      <template v-if="screenWidth < 600">
        <div style="margin: 10px 0"><v-btn plain elevation="0" @click="mobileDrawer = true" style="float: left; margin: 10px" height="50px"><v-img src="@/assets/menu.png" /></v-btn></div>
      </template>

      <div style="margin: auto; padding-left: 10px">
        <router-link :to="{name: 'Home'}">
          <v-img src="@/assets/iiiqio.png" height="auto" width="auto" cover/>
        </router-link>
      </div>

      <template v-if="screenWidth >= 600">
        <div style="margin: auto 10px;">
          <v-btn size="large" @click="BrandSelection = !BrandSelection">Solutions</v-btn>
        </div>
        <!-- <div><v-btn @click="advDrawer = true">Advanced Controls</v-btn></div> -->
        <!-- <div style="margin: 10px 0"><v-btn @click="authDrawer = true" style="float: right; margin: 10px" height="50px" width="50px"><v-avatar><v-img  :src="auth.user.photoURL" style="filter: grayscale(100%);"/></v-avatar></v-btn></div> -->
      </template>
    </div>

    <!-- Mobile Drawer -->
    <v-layout>
      <v-navigation-drawer v-if="screenWidth < 600" v-model="mobileDrawer" touchless temporary position="top" style="left: 0; max-height: 25vh">
        <div class="pad">
          <div id="buffer"></div>
          <v-btn size="large" block @click="mobileDrawer = false; mobileBrandSelection = true;" elevation="1" style="border: 1px solid #d3dae6">Solutions</v-btn>
        </div>
      </v-navigation-drawer>
    </v-layout>

    <!-- Brand Selection -->
    <v-layout>
      <!-- If PC/Large Screen -->
      <v-navigation-drawer v-if="screenWidth >= 600" v-model="BrandSelection" touchless temporary position="left" class="miniSideNav">
        <div class="pad">
          <div v-for="solution in solutions" :key="solution.id"><div v-if="ButtonTypeExists(solution)"></div></div>

          <div v-for="button in buttonGroup" :key="button">
            <v-btn size="large" @click="coreDrawer=true; mobileBrandSelection=false; typeSelected = button" block elevation="1" style="border: 1px solid #d3dae6">{{button}}</v-btn>
            <div id="buffer"></div>
          </div>
        </div>
      </v-navigation-drawer>

      <!-- If Mobile/Small Screen -->
      <v-navigation-drawer v-if="screenWidth < 600" v-model="mobileBrandSelection" touchless temporary position="top" style="left: 0; height: auto; max-height: 50%; padding: 2.5% 0;">
        <div class="pad">
          <div v-for="solution in solutions" :key="solution.id"><div v-if="ButtonTypeExists(solution)"></div></div>

          <div v-for="button in buttonGroup" :key="button">
            <v-btn size="large" @click="coreDrawer=true; mobileBrandSelection=false; typeSelected = button" block elevation="1" style="border: 1px solid #d3dae6">{{button}}</v-btn>
            <div id="buffer"></div>
          </div>
        </div>
      </v-navigation-drawer>
    </v-layout>

    <!-- Main Panel Drawer -->
    <v-layout>
      <!-- If PC/Larger Screen -->
      <v-navigation-drawer v-if="screenWidth > 700" touchless v-model="coreDrawer" temporary position="left" class="sideNav">
      <div v-for="sol in solutions" :key="sol.id">
        <template v-if="(sol.public || development) && (typeSelected === sol.type)">
          <router-link :to="{name: 'Core', params: { url: sol.url }}">
            <SolutionCard @click="coreDrawer = false" :image1="sol.market_image_1" :image2="sol.market_image_2" :title="sol.name"/>
          </router-link>
        </template>
      </div>
    </v-navigation-drawer>

    <!-- If Mobile/Tiny Screen -->
    <v-navigation-drawer v-else v-model="coreDrawer" touchless temporary position="top" style="left: 0; height: auto; max-height: 50%; padding: 2.5% 0;">
      <div v-for="sol in solutions" :key="sol.id">
        <template v-if="(sol.public || development) && (typeSelected === sol.type)">
          <router-link :to="{name: 'Core', params: { url: sol.url }}">
            <SolutionCard @click="coreDrawer = false" :image1="sol.market_image_1" :image2="sol.market_image_2" :title="sol.name"/>
          </router-link>
        </template>
      </div>
    </v-navigation-drawer>
    </v-layout>

    <!-- Advanced Drawer -->
    <v-layout>
      <v-navigation-drawer v-model="advDrawer" touchless temporary position="left" class="sideNav">
        <SolutionCard :image1="image1" :image2="image2" :title="title"/>
        <router-link :to="{name: 'Budgetary', params: {url: 'test'}}">Budgetary</router-link>
      </v-navigation-drawer>
    </v-layout>
    
    <!-- Login and User Drawer -->
    <v-layout>
      <v-navigation-drawer v-if="screenWidth > 600" v-model="authDrawer" touchless temporary position="right" class="miniSideNav">
      <div class="pad" v-if="loggedIn">
        <div id="buffer"></div>
        <router-link :to="{name: 'BudgetaryList'}" style="text-decoration: none">
          <v-btn size="large" block @click="authDrawer = false" elevation="1" style="border: 1px solid #d3dae6">Budgetary Quotes</v-btn>
        </router-link>
        <div id="buffer"></div>
        <v-btn size="large" block @click="Logout" elevation="1" style="border: 1px solid #d3dae6">Logout</v-btn>
      </div>
      <div class="pad" v-else>
        <div id="buffer"></div>
        <v-btn size="large" block type="black" outlined @click="Login" elevation="1" style="border: 1px solid #d3dae6">Sign in with Google</v-btn>
        <div id="buffer"></div>
        <v-btn size="large" block type="black" outlined @click="MicrosoftLogin" elevation="1" style="border: 1px solid #d3dae6">Sign in with Microsoft</v-btn>
      </div>
    </v-navigation-drawer>
    </v-layout>
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue'
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
    onMounted(() => {
      window.addEventListener("resize", updateWidth)
    })
    onUnmounted(() => {
      window.removeEventListener("resize", updateWidth)
    })

    const screenWidth = ref(window.innerWidth)
    const typeSelected = ref('')
    const buttonGroup = []
    const coreDrawer = ref(false)
    const advDrawer = ref(false)
    const authDrawer = ref(false)
    const mobileDrawer = ref(false)
    const mobileBrandSelection = ref(false)
    const BrandSelection = ref(false)
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

    const ButtonTypeExists = (sol) => {
      for(var i=0; i < buttonGroup.length; i++) {
        if (sol.type == buttonGroup[i]) {
          return false;
        }
      }

      buttonGroup.push(sol.type)
      return true;
    }

    const updateWidth = () => {
      screenWidth.value = window.innerWidth
      ClearButtonArray()
    }
    const ClearButtonArray = () => {
      buttonGroup.splice(0, 99999)
    }

    return {
      mobileBrandSelection, BrandSelection,
      mobileDrawer, coreDrawer, advDrawer, authDrawer,
      solutions,
      image1, image2,
      title,
      Login, MicrosoftLogin, Logout,
      ButtonTypeExists,
      auth, development,
      screenWidth,
      buttonGroup,
      typeSelected 
    }
  }
}
</script>

<style>
#buffer {
  margin: 20px;
}
#vertical-center {
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}

.pad {
  padding: 10px;
}

.sideNav  {
  width: 33% !important;
}
.miniSideNav {
  width: 25% !important;
}

@media (max-width: 1150px) {
  .sideNav  {
    width: 50% !important;
  }
  .miniSideNav {
    width: 33% !important;
  }
}
@media (max-width: 900px) {
  .sideNav  {
    width: 75% !important;
  }
  .miniSideNav {
    width: 50% !important;
  }
}
</style>