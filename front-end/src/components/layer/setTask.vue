<template>
	<div>
		<div class="setTask-content"">
			<div class="deleteTask">
				<i class="fas fa-trash"></i>
				<ul class="sub-nav">
					<li @click="deleteOnlytask">태스크만 삭제</li>
					<li>하위 태스크까지 삭제</li>
				</ul>
			</div>
			
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		created () {
		},
		methods: {
			async deleteOnlytask () {
				const data = this.taskInfo
				console.log("bbb	")
				const json = await fetch('/api/task-only', {
					method: 'post',
					headers: {'Content-Type':'application/json'},
					body: JSON.stringify(data)
				}).then(res=>res.json())
				if(json.success){
					if(confirm("현재 태스크만 삭제하시겠습니까? 하위 태스크는 현재 태스크의 상위 태스크에 귀속됩니다.")){
						this.$store.commit('deleteTask', this.$store.state.layerData.key)
						this.$store.commit('closeLayer') 
					}
				} else {
					alert('task 삭제 실패')
				}
			}			
		},
		props: ['taskInfo']

	}
</script>
<style lang="scss">
.setTask-content { position:absolute;  box-sizing: border-box; padding-top: 15px; padding-left: 30px}
.fa-trash {font-size: 20px; line-height: 30px; width: 30px }
.deleteTask, .sub-nav{ display:flex; line-height: 30px}
.sub-nav >li { padding: 0 10px; cursor: pointer; border: dashed #aaa 1px; border-radius: 10px; margin-right: 10px;
	&:hover { background: #fff; transition: .6s}
}
</style>
