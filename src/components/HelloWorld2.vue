<template>
  <div class="hello">
    <slot name="header"/>
    <h1>{{ msg }}</h1>
    <h1>{{ money }}</h1>
    <slot></slot>
    <slot name="body"/>
    <slot :slotProps="slotProps">{{slotProps}}</slot>
    <h1 v-html="money > 99 ? 99 : money"></h1>
    <h1>{{ money | moneyFilter }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a
          href="https://vuejs.org"
          target="_blank"
        >
          Core Docs
        </a>
      </li>
      <li>
        <a
          href="https://forum.vuejs.org"
          target="_blank"
        >
          Forum
        </a>
      </li>
      <li>
        <a
          href="https://chat.vuejs.org"
          target="_blank"
        >
          Community Chat
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/vuejs"
          target="_blank"
        >
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a
          href="http://vuejs-templates.github.io/webpack/"
          target="_blank"
        >
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a
          href="http://router.vuejs.org/"
          target="_blank"
        >
          vue-router
        </a>
      </li>
      <li>
        <a
          href="http://vuex.vuejs.org/"
          target="_blank"
        >
          vuex
        </a>
      </li>
      <li>
        <a
          href="http://vue-loader.vuejs.org/"
          target="_blank"
        >
          vue-loader
        </a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
        >
          awesome-vue
        </a>
      </li>
    </ul>
    <slot name="footer"/>
  </div>
</template>

<script>
import demoMixin from './fragments/demoMixin'
import demoExtends from './fragments/demoExtends'
export default {
  name: 'HelloWorld',
  mixins: [demoMixin],
  extends: demoExtends,
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      slotProps: 'maile start',
      money: 100,
      obj: {
        number: 123,
        text: 'text',
        header: 'header'
      }
    }
  },
  filters: {
    // 过滤器
    moneyFilter(money) {
      return money > 99 ? 99 : money
    }
  },
  created() {
    console.log(this.$data)
    console.log('component created');
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
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
