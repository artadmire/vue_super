<template>
  <div id="app">
    <img src="./assets/logo.png">
    <hello-world>
      <p>{{ msg }}</p>
      <template v-slot:header>{{ header }}</template>
      <template v-slot:body>{{ body }}</template>
      <template v-slot:footer>{{ footer }}</template>
      <!-- 老版 -->
      <template slot="content" slot-scope="{ slotProps }">
          {{ slotProps }}
      </template>
      <!-- 新版 -->
      <!-- <template v-slot:slotProps="slotProps">
        {{ slotProps }}
      </template> -->
    </hello-world>
    <!-- ================================ -->
    <hello-world2></hello-world2>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import HelloWorld2 from './components/HelloWorld2.vue'
export default {
  components: {
    HelloWorld,
    HelloWorld2
  },
  name: 'App',
  data() {
    return {
      msg: 'maile start',
      header: 'maile header',
      body: 'maile body',
      footer: 'maile footer'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
