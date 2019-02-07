<template>
	<header class="header">
		<div class="container">
			<h1 class="logo">LinkRoad</h1>
			<ul class="s-gnb" v-if="$store.state.member">
				<li><a href="#" @click.prevent="logout">로그아웃</a></li>
			</ul>
			<ul class="s-gnb" else>
				<li><a href="#" @click.prevent="openLoginPopup">로그인</a></li>
			</ul>
			<ul class="l-gnb" v-if="$store.state.member"></ul>
		</div>
	</header>
</template>
<script>
import login from './member/login'

export default {
	methods: {
		openLoginPopup () {
			this.$store.commit('openLayer', login)
		},
		logout () {
			this.$store.commit('logout')
			this.$router.push('/')
		}
	}
}
</script>
	