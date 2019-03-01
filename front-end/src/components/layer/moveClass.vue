<template>
	<div class="move-class-contents">
		<h3 class="layer-title">클래스 설정</h3>

		<ul>
			<li><span>이동하기</span></li>
			<li><span>임시저장소로 이동</span</li>
				<li><span @click="deleteClass">삭제하기</span></li>
			</ul>
		</div>
	</template>
	<script type="text/javascript">
		export default {
			methods: {
				async deleteClass () {
					if(confirm("정말로 삭제할것인가요?")){
						const json = await fetch(`/api/delete-class/${this.$store.state.classInfo.cidx}`, {
							method: 'post',
							headers: {'Content-Type': 'application/json'},
						}).then(res=>res.json())

						if(json.success) {
							alert('class 삭제 성공!')
							this.$store.commit('closeLayer')
							this.$router.push('/home')
						} else {
							alert('class 삭제 실패!')
						}
					}
				}
			}
		}
	</script>
	<style lang="scss">
	.move-class-contents {width: 450px; 
		ul { display: flex; justify-content: space-between; vertical-align: center }
		li {  width: 200px;  cursor: pointer; 
			&:hover { background: #eee;
			}
			span { display:block; padding: 8px;}
		}
		.layer-title { margin-bottom: 0px; padding: 10px 0;}
	}

</style>