<template>
	<div class="ClassLayer">
		<form action="/api/put-class" method="post" @submit.prevent="putClass">
			<ul class="fields">
					<label class="input-label">
						<span class="pre"><i class="fas fa-tag"></i></span>
						<input type="text" name="title" class="full-width" required autofocus>
						<span class="lbl">제목</span>
					</label>
				</li>
				<li>
					<label class="input-label">
						<span class="pre"><i class="fas fa-info"></i></span>
						<textarea name="description" class="full-width"></textarea>
						<span class="lbl">상세설명</span>
					</label>
				</li>
			</ul>
			<button class="btn" type="submit">Class 추가</button>
		</form>
	</div>	
</template>
<script type="text/javascript">
	export default {
		methods : {
			putClass (e) {
				const frm = e.target
				const data = {
					title: frm.title.value,
					description: frm.description.value
				}
				fetch(frm.action, {
					method: 'post',
					headers: {'Content-Type':'application/json'},
					body: JSON.stringify(data)
				}).then(res=>res.json()).then(json=>{
					if(json.success){
						alert('class 추가 완료')
						data.cidx = json.cidx
						this.$store.state.classList.push(data)
						this.$store.commit('closeLayer')
					} else {
						alert('class 추가 실패')
					}
				})
			}
		}
	}
</script>
<style lang="scss">

</style>