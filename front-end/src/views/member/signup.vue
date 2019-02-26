<template>
	<div class="signup" v-if="!$store.state.member">
		<h3 class="layer-title">회원가입</h3>
		<form action="/api/signup" method="post" @submit.prevent="signup">
			<ul class="fields">
				<li>
					<label class="input-label">
						<span class="pre"><i class="fas fa-user"></i></span>
						<input type="text" name="id" class="full-width" required>
						<span class="lbl">아이디</span>
					</label>
				</li>
				<li>
					<label class="input-label">
						<span class="pre"><i class="fas fa-key"></i></span>
						<input type="password" name="pw" class="full-width" required>
						<span class="lbl">비밀번호</span>
					</label>
				</li>
				<li>
					<label class="input-label">
						<span class="pre"><i class="fas fa-key"></i></span>
						<input type="password" name="pw-re" class="full-width" required>
						<span class="lbl">비밀번호 재확인</span>
					</label>
				</li>
				<li>
					<label class="input-label">
						<span class="pre"><i class="far fa-envelope"></i></span>
						<input type="text" name="email" class="full-width" required>
						<span class="lbl">이메일</span>
					</label>
				</li>
				<input class="btn" type="submit" value="완료">
			</ul>
		</form>
	</div>	
</template>
<script type="text/javascript">
	export default {
		methods: {
			signup(e) {
				const frm = e.target
				const data = {
					id: frm.id.value,
					pw: frm.pw.value,
					email: frm.email.value
				}
				fetch('/api/signup', {
					method: 'post',
					headers: {  'Content-Type': 'application/json' },
					body: JSON.stringify(data)
				})
				.then(res=>res.json()).then(json => {
					if(json.success){
						alert('회원가입 되었습니다. 로그인 하여 이용해주세요')
					} else {
						alert('오류')
					}
				})
			}
		}
	}
</script>
