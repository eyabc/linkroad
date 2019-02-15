<template>
	<div>
		<div class="box1" v-if="!editState">
			<header class="box-title box-main-title">
				<h1>{{ classInfo.title }}</h1>
				<div>
					<span class="small-font">생성날짜 {{classInfo.date}}</span> 
					<span @click="goEdit"><i class="fas fa-pencil-alt title-friend" ></i></span>
				</div>
			</header>
			<p v-html="nl2br(classInfo.description)" />
		</div>
		<div class="box1 class-edit" v-else>
			<form method="post" @submit.prevent="editClass">
				<header class="box-title box-main-title">
					<input type="text" name="title" :value="`${classInfo.title}`" required Tabindex=1>
					<div>
						<button type="submit"><i class="fas fa-check title-friend" Tabindex=3></i></button>
						<span @click="editCancel"><i class="fas fa-undo-alt title-friend"></i></span>
					</div>
				</header>
			<textarea name="description" :value="`${classInfo.description}`" Tabindex=2></textarea>
			</form>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		data () {
			return {
				classInfo: null,
				editState: false,
			}
		},
		created () {
			this.getClass()
		},
		methods: {
			async getClass () {
				const json = await fetch ('/api/class-list/' + this.$route.params.cidx).then(res=>res.json())
				this.classInfo = json.classInfo
				console.log(this.classInfo)
			},
			goEdit () {
				this.editState = true
			},
			editCancel () {
				if(confirm("수정을 취소하시겠습니까?")){
					this.editState = false
				}
			},
			async editClass (e) {
				const frm = e.target
				const data = {
					title: frm.title.value,
					description: frm.description.value
				}
				console.log(data)

				await fetch('/api/update-class/'+this.classInfo.cidx, {
					method: 'post',
					headers: {  'Content-Type': 'application/json' },
					body: JSON.stringify(data)
				})
				.then(res=>res.json()).then(json=>{
					if(json.success){
						this.classInfo.title=data.title
						this.classInfo.description=data.description
						this.editState = false
					} else {
						alert('오류')
					}
				})
			}
		}

	}
</script>

<style type="text/css">
.small-font { font-size: 12px; color : #777; display: inline-block;margin-right: 10px }
.class-edit 
input { height: 30px; width: calc(100%); padding-right: 50px; 
	box-sizing: border-box;}
	i { display: inline-block; padding-right: 10px;
	}
	textarea {width: 100%; height: 80px; box-sizing: border-box;}

</style>