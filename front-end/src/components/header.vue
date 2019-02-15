<template>
	<header class="header">
		<div class="container">
			<div class="s-gnb">
				<ul v-if="$store.state.member">
					<li><a href="#" @click.prevent="logout">로그아웃</a></li>
				</ul>
				<ul v-else>
					<li><a href="#" @click.prevent="openLoginPopup">로그인</a></li>
				</ul>
			</div>
			<h1 class="logo"><router-link class="notTd" :to="`/home`">LinkRoad</router-link></h1>
			<div class="search-frm">
				<label class="input-label">
					<input type="text" name="search-query" autofocus>
					<button type="submit" class="pre" @click.prevent="search"><i class="fas fa-search-location title-friend"></i></button>
				</label>
			</div>
			<ul class="l-gnb" v-if="$store.state.member"></ul>
		</div>
	</header>
</template>
<script>
	import login from './member/login'

	export default {
		created () {
			this.memberCheck()
		},
		methods: {
			openLoginPopup () {
				this.$store.commit('openLayer', login)
			},
			logout () {
				this.$store.commit('logout')
				this.$router.push('/')

			},
			search () {
				console.log("search")
			},
			memberCheck () {
			// console.log("memberCheck")
			fetch('/api/login').then(res=>res.json()).then(json=>{
				console.log(json)
				const storageMember = sessionStorage.getItem('member')
				this.$store.state.member = json.success ? json.member : null
			})
		}
	}
}
</script>
<style lang='scss' scoped>


</style>