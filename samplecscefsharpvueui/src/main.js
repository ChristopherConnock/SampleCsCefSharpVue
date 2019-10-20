import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify'
import { EventBus } from './eventbus'

Vue.config.productionTip = false

window.Store = store

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  mounted () {
    EventBus.$on('add-text', (data) => {
      console.log('main:' + data)
      // this.$store.commit('ADD_TEXT', data)
    })
    EventBus.$on('add-json', (data) => {
      // let obj = JSON.parse(data)
      // console.log(obj)
      this.$store.commit('ADD_TEXT', data)
    })
  }
}).$mount('#app')

window.EventBus = EventBus // expose globally for .net
