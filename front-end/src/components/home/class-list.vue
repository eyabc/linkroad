<template>
	<div>
		<h1 class="box-title">Class 목록 <span @click="openClassPopup"><i class="fas fa-plus"></i></span></h1>

		<ul class="class-list" v-if="$store.state.classList.length">
			<li class="class-item" v-for="v in $store.state.classList">
				<a href="#" @click.prevent="test">{{v.title}}</a>
			</li>
		</ul>
	</div>
</template>
<script type="text/javascript">
	import addClass from '../class/addClass'
	export default {
		created () {
			this.getClassList ()
		},
		methods: {
			getClassList () {
				fetch ('/api/class-list').then(res=>res.json()).then(json=>{
					this.$store.commit('setClassList', json.classList)
				})
			},
			openClassPopup () {
				this.$store.commit('openLayer', addClass)
			},
			test() {
				console.log("test")
			}
		}
	}
</script>