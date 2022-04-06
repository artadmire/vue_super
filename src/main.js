// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MyPlugin from './plugins/myPlugin'

Vue.config.productionTip = false

// 加载拓展插件
const _options = {
  name: 'my baby plugin'
}

Vue.use(MyPlugin, _options)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

// 拓展一个构造器
let _baseOptions = {
  data: function() {
    return {
      course: 'zhaowa',
      session: 'vue',
      teacher: 'yy'
    }
  },
  created() {
    console.log('extend base')
  }
}

const BaseComponent = Vue.extend(_baseOptions)
// 基于_BaseComponent，再拓展逻辑
new BaseComponent({
  created() {
    console.log('extend created')
  }
})
