import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// Vue.prototype.getClassList = async () => {
// 	const json = await fetch ('/api/class-list').then(res=>res.json())
// 	return json.classList
// }
Vue.prototype.nl2br = str => {
	return str.split("\n").join('<br>')
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
