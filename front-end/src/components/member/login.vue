<template>
	<div class="login" v-if="!$store.state.member">
		<h3 class="layer-title">&nbsp; </h3>
		<form action="" method="post" @submit.prevent="">
			<ul class="fields">
				<li>
					<label class="input-label">
						<span class="pre"><i class="fas fa-user"></i></span>
						<input type="text" name="id" class="full-width" required autofocus>
						<span class="lbl">아이디</span>
					</label>
				</li>

				<li>
					<label class="input-label">
						<span class="pre"><i class="fas fa-key"></i></span>
						<input type="password" name="pw" class="full-width" required>
						<span class="lbl">비밀번호</span>
						<small v-if="capsLock">capsLock이 켜져있습니다</small>
					</label>
				</li>
				<input class="btn" type="submit" value="로그인">
				<div class="option">
					<a href="#" @click.prevent="signinPopup">회원가입</a>
					<a href="#">pw/id 찾기</a>
				</div>
			</ul>
		</form>
	</div>
</template>
<script>
	export default {
		data () {
			return {
				capsLock: false
			}
		},
		methods: {
			capsLockCheck (e) {
				if(e.getModifierState("CapsLock")){
					this.capsLock = true
				} else {
					this.capsLock = false
				}
			},
			signinPopup () {
				let popOption="width=400px, height=350px, toolbar=no, menubar=no, location=no, status=no, resizable=no;"
				window.open(this.$store.state.siteurl+'/signup', "회원가입" , popOption, false)
			}
		}
	}
</script>