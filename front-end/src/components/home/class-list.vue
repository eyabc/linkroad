<template>
	<div>
		<h1 class="box-title">Class 목록</h1>
		<ul class="class-list" v-if="$store.state.classList.length">
			<li class="class-item" v-for="v in $store.state.classList">
				<span> {{v.title}} </span>
			</li>
		</ul>
	</div>
</template>
<script type="text/javascript">
	export default {

		created () {
			this.getClassList ()
		},

		methods: {
			getClassList () {
				fetch ('/api/class-list').then(res=>res.json()).then(json=>{
					this.$store.commit('setClassList', json.classList)
				})
			}
		}
	}
</script>