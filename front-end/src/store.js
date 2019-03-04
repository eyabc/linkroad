import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    member: JSON.parse(localStorage.getItem('member')),
    layerState: false,
    siteurl: "http://localhost:8080",
    classList: [],
    classInfo: null,
    layerData: null,
    taskList: null,
  },
  mutations: {
    openLayer(state, val) {
    	state.layerState = val
    },
    closeLayer(state) { state.layerState = false; state.layerData=null },
    logout(state) { state.member = null},
    setClassList(state, val) { state.classList = val},
    setClassInfo(state, val) { state.classInfo = val},
    setLayerData(state, key) { state.taskList[key] = state.layerData},
    deleteTask(state, key) { state.taskList.splice(key, 1) }
  },
  actions: {

  }, 
})
