<template>
	<header class="header">
		<div class="container">
			<h1 class="logo">LinkRoad</h1>
			<ul class="s-gnb isMember" v-if="$store.state.member">
				<li><a href="#" @click.prevent="logout">로그아웃</a></li>
			</ul>
			<ul class="s-gnb notMember" v-else>
				<li><a href="#" @click.prevent="openLoginPopup">로그인</a></li>
			</ul>
		</div>
		<ul class="l-gnb" v-if="$store.state.member"></ul>
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
	