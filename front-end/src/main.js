import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import VueCkeditor from 'vue-ckeditor5'

Vue.config.productionTip = false

// Vue.prototype.getClassList = async () => {
// 	const json = await fetch ('/api/class-list').then(res=>res.json())
// 	return json.classList
// }
Vue.prototype.nl2br = str => {
	return str.split("\n").join('<br>')
}

const options = {
	editors: {
		classic: ClassicEditor,
	},
	name: 'ckeditor',
	config: {
		startupFocus: true
	},
	ready () {
		console.log('test')
	}
}
Vue.use(VueCkeditor.plugin, options);
Vue.mixin({
	mounted () {
		const target = document.querySelectorAll('[autofocus]')
		if (target.length > 0) target[0].focus()
	}
})

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
