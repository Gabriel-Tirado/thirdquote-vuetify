<template>
  <div class="home">
    <HelloWorld msg="Welcome!"/>
    <h2>Select a solution above to get a quote fast.</h2>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import auth from '../firebase/auth'

export default {
  name: 'HomeComp',
  components: {
    HelloWorld
  },
  setup() {
      return { auth }
  }
}
</script>