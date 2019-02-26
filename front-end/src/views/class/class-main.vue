<template>
	<div class="contents" v-if="classInfo">
		<div class="class-info" v-if="!editState">
			<header class="">
				<h1>{{ classInfo.title }}</h1>
				<hr class="class-hr">
			</header>
			<div class="opt">
				<span class="small-font">생성날짜 {{classInfo.date}}</span> 
				<span @click="goEdit"><i class="fas fa-pencil-alt icons" ></i></span>
			</div>
			<p v-html="nl2br(classInfo.description)" />
		</div>
		<div class="class-info class-edit" v-else>
			<form method="post" @submit.prevent="editClass">
				<header class="">
					<input type="text" name="title" :value="`${classInfo.title}`" required Tabindex=1>
				</header>
				<textarea name="description" :value="`${classInfo.description}`" Tabindex=2></textarea>
				<div>
					<button type="submit"><i class="fas fa-check icons" Tabindex=3></i></button>
					<span @click="editCancel"><i class="fas fa-undo-alt icons"></i></span>
				</div>
			</form>
		</div>

		<div class="lev">
			<levelView class="level-contents" v-for="(tasks, level) in levels" :tasks="tasks" :level="level" />
		</div>
	</div>
</template>
<script type="text/javascript">
	import levelView from '@/components/class/level-view'
	export default {
		components: {
			levelView
		},
		data () {
			return {
				classInfo: null,
				editState: false,
				levels: [],
				cidx: this.$route.params.cidx
			}
		},
		created () {
			this.getClass()
			this.getTask()
		},
		methods: {
			async getClass () {
				const json = await fetch ('/api/class-list/' + this.cidx).then(res=>res.json())
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

				const json = await fetch('/api/update-class/'+this.classInfo.cidx, {
					method: 'post',
					headers: {  'Content-Type': 'application/json' },
					body: JSON.stringify(data)
				}).then(res=>res.json())
				if(json.success){
					this.classInfo.title=data.title
					this.classInfo.description=data.description
					this.editState = false
				} else {
					alert('오류')
				}
			},
			async getTask () {
				const json = await fetch(`/api/get-task/${this.cidx}/0`).then(res=>res.json())
				this.levels.push(json.taskInfo)
			}
		}

	}
</script>

<style lang="scss">
@mixin clear () {
	&:after{content:"";display:block;clear:both;}
}
h1 { font-size: 20px }
.contents { padding: 10px; }
.small-font { font-size: 12px; color : #777; display: inline-block;margin-right: 10px }
.class-edit 
input { height: 30px; width: calc(50%); padding-right: 50px; box-sizing: border-box; }
textarea {width: 50%; height: 80px; box-sizing: border-box;}
.class-info {
	width: 100%;
	text-align: center;
	margin-bottom: 20px;
	height: 100px;
}
hr.class-hr { width: 30%; margin: 0 auto; height: 3px;background-color: #ddd; border: none; }
.opt { line-height: 20px;
	span { top:0;line-height: 20px; }
	i{ line-height:20px}
}
.lev { 
	display: flex;
	flex-wrap: nowrap; 
  overflow-x: auto; 
  -webkit-overflow-scrolling: touch; 
  -ms-overflow-style: -ms-autohiding-scrollbar;  
}
.scroll::-webkit-scrollbar {
  display: none; }
.level-contents{flex: 0 0 auto; margin: 0 10px}
</style>