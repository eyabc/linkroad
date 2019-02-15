<template>
	<div class="box1">
		<header class="box-title box-main-title">
			<h1>Class 목록</h1>
			<div>
				<span class="title-friend" ><i @click="openClassPopup" class="fas fa-plus"></i></span>
			</div>
		</header>
		 
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
			// this.$store.commit('setClassList', this.getClassList())
			this.getClassList()
		},
		methods: {
			openClassPopup () {
				this.$store.commit('openLayer', addClass)
			},
			viewClass() {
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