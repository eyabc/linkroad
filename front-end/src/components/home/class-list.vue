<template>
	<div>
		<h1 class="box-title">Class 목록 <span @click="openClassPopup"><i class="fas fa-plus"></i></span></h1>
		<ul class="class-list">
			<li class="class-item" v-for="v in $store.state.classList">
				 <router-link :to="`/class/${v.cidx}`" >{{v.title}}</router-link>
			</li>
		</ul>
	</div>
</template>
<script type="text/javascript">
	import addClass from '../class/addClass'
	export default {
		created () {
			this.getClassList()
		},
		methods: {
			openClassPopup () {
				this.$store.commit('openLayer', addClass)
			},
			viewClass() {
				console.log("test")
				
				this.$router.push('/class')
			},
			test() {
				console.log("test")
			},
			async getClassList () {
				const json = await fetch ('/api/class-list').then(res=>res.json())
				this.$store.commit('setClassList', json.classList)
			}
		}
	}
</script>