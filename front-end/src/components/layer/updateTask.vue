<template>
	<div class="ClassLayer">
		<label class="input-label">
			<span class="pre"><i class="fas fa-tag"></i></span>
			<input type="text" v-model="data.title" class="full-width" @blur="update" tabindex="0">
			<span class="lbl">제목</span>
		</label>
		<div v-show="UpdateDesc">
			<ckeditor type="classic" v-model="data.description" @blur="UpdateDescClose" @ready="editorFocus" tabindex="1"></ckeditor>
		</div>
		<div v-show="!UpdateDesc" class="task-content" v-html="nl2br(data.description)" @click="UpdateDescOpen" />
		<div class="url-wrap">
			<label class="input-label url-content" @click="openLink">
				<span class="pre"><i class="fas fa-link"></i></span>
				<input type="text" ref="link" v-model="data.url" class="url full-width" @blur="update" tabindex="2" :disabled="openLinkPrevent">
			</label>
			<span><i class="fas fa-pen-square" @click="openLinkFocus"></i></span>
		</div>
		<span class="taskmore" @click="openSetTaskToggle"><i class="more-icon fas fa-ellipsis-v"></i></span>
		<setTask class="setTask-wrap" :class="{ showSetTask : openSetTask }" :taskInfo="data"/>
		<span class="taskmore closeSetTask  " @click="openSetTaskToggle" v-if="openSetTask"><i class="fas fa-angle-left more-icon"></i></span>

	</div>	
</template>
<script type="text/javascript">
	import setTask from '@/components/layer/setTask'
	export default {
		components: {setTask},

		created () {

			this.initLayerData ()
		},
		data (e) {
			return {
				data: {
					tidx: null,
					title: '',
					url: '',
					description: '',
					editor: null,
					parent_tidx: null,
				},
				UpdateDesc: false ,
				openLinkPrevent: true,
				openSetTask: false
			}
		},
		methods: {
			initLayerData () { Object.assign(this.data, this.$store.state.layerData) },
			setLayerData () { Object.assign(this.$store.state.layerData, this.data) },
			async update () {
				const json = await fetch('/api/task', {
					method: 'put',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify(this.data)
				}).then(res => res.json())
				this.setLayerData()
				this.openLinkPrevent = true
			},
			UpdateDescClose () {
				this.UpdateDesc = false
				this.update()
			},
			UpdateDescOpen () {
				this.UpdateDesc = true
				this.$nextTick(() => {
					this.editor.editing.view.focus()
				})
			},
			editorFocus (editor) {
				this.editor = editor
				editor.editing.view.focus()
			},
			openLink () {
				if (this.data.url.length === 0)
					this.openLinkFocus()
				else if (this.openLinkPrevent)
					window.open(this.data.url)
			},
			openLinkFocus () {
				this.openLinkPrevent = false
				this.$nextTick(() => {
					this.$refs.link.focus()						
				})
			},
			openSetTaskToggle () {
				this.openSetTask = !this.openSetTask
			},
			test () {console.log("test")}
		},
		props: ['task']
	}
</script>
<style lang="scss">
.ClassLayer{
	height: auto;
	.input-label {  }
}
.ck-editor__editable {
	min-height: 300px;
}
.task-title {
	line-height: 50px; padding-left: 50px; cursor:pointer;
}
.task-content { min-height: 320.67px; border: solid 2px #eee; border-radius: 7px; padding: 10px;}
.url-content {width: calc(100% - 40px);}
.url { cursor: pointer; 
	&:hover{text-decoration: underline;}
}

.url-wrap { display:flex;
	&>span { position:absolute; display:inline-block; width: 50px; height: 50px; display: flex; justify-content:center;align-items:center; right:40px; font-size: 20px; color: #09f;
		&>i:hover { font-size: 25px; transition: 0.5s}
	}
}
.more-icon { position: absolute; display: inline-block; display:flex; justify-content: center; vertical-align: center; 
	&:hover { font-size: 20px; transition: .3s; color: #09f}	
}
.fa-ellipsis-v {left: 0; top:50%; width: 40px; height: 20px;}
.taskmore {cursor: pointer}
.setTask-wrap {position: absolute; width: 0; height: 100%; background: #eee; z-index: 10; left:0; top:0; transition: .5s; overflow: hidden;}

.closeSetTask {  top: 40px}
.fa-angle-left { right: 0; display: inline-block; width: 30px; height: calc( 100% - 30px); top:30px; display: inline-block; display:flex; justify-content: center; align-items: center; }
.showSetTask {  width:750px }
</style>