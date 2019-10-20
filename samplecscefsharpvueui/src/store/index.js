import Vue from 'vue'
import Vuex from 'vuex'
import { EventBus } from '../eventbus'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fields: [{ name: 'test', type: 'type' }],
    desc: 'this is here'
  },
  mutations: {
    ADD_TEXT (state, data) {
      console.log('store: about to emit')
      EventBus.$emit('SET_TEXT', data)
    },

    addField (state, field) {
      console.log(field)
      state.fields.push(field)
    }
  },
  actions: {
  },
  modules: {
  }
})
