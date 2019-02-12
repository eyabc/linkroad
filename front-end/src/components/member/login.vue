<template>
	<div class="login" v-if="!$store.state.member">
		<h3 class="layer-title">&nbsp; </h3>
		<form action="/api/login" method="post" @submit.prevent="login">
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
			</ul>
			<button class="btn" type="submit">로그인</button>
			<div class="option">
				<a href="#" @click.prevent="autoLogin" class="">자동로그인</a>
				<a href="#" @click.prevent="signinPopup">회원가입</a>
				<a href="#">pw/id 찾기</a>
			</div>
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
			},
			login (e) {
				const frm = e.target
				const data = {
					pw: frm.pw.value,
					id: frm.id.value
				}
				fetch('/api/login', {
					method: 'post',
					headers: {'Content-Type':'application/json'},
					body: JSON.stringify(data)
				}).then(res=>res.json()).then(json=>{
					console.log(json)
					if(json.success){
						alert('로그인 되었습니다.')
						this.$store.state.member = json.member
						this.$store.commit('closeLayer')
						this.$router.push('/home')
					} else {
						alert('아이디 또는 비밀번호가 일치하지 않습니다.')
						frm.id.focus()
					}
				})
			}
		}
	}
</script>