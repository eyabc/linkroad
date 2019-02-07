import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    member: null,
    layerState: false
  },
  mutations: {
    openLayer(state, val) { state.layerState = val},
    closeLayer(state, val) { state.layerState = false},
  	logout (state) { state.member = null }
  },
  actions: {

  }, 
})
