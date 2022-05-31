<template>
  <div class="hello">
    <h2>You need one. Make it good.</h2>
    <v-img alt="Third Quote logo" src="@/assets/iiiqfull.png" width="auto" height="auto" style="margin: 10px auto"/>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
