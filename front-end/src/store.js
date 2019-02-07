import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    member: null,
    layerState: false,
    siteurl: "http://localhost:8080"
  },
  mutations: {
    openLayer(state, val) { state.layerState = val},
    closeLayer(state) { state.layerState = false},
    logout(state) { state.member = null }
  },
  actions: {

  }, 
})
