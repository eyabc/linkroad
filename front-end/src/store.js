import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    member: JSON.parse(localStorage.getItem('member')),
    layerState: false,
    siteurl: "http://localhost:8080",
    classList: [],
    classInfo: null
  },
  mutations: {
    openLayer(state, val) { state.layerState = val},
    closeLayer(state) { state.layerState = false},
    
    logout(state) { state.member = null},
    setClassList(state, val) { state.classList = val},
    setClassInfo(state, val) { state.classInfo = val}
  },
  actions: {

  }, 
})
