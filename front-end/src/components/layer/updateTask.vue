<template>
	<div class="ClassLayer">
		<label class="input-label">
			<span class="pre"><i class="fas fa-tag"></i></span>
			<input type="text" v-model="data.title" class="full-width" @blur="update">
			<span class="lbl">제목</span>
		</label>
		<div v-show="UpdateDesc">
			<ckeditor type="classic" v-model="data.description" @blur="UpdateDescClose" @ready="editorFocus"></ckeditor>
		</div>
		<div v-show="!UpdateDesc" class="task-content" v-html="nl2br(data.description)" @click="UpdateDescOpen" />
		<label class="input-label">
			<span class="pre"><i class="fas fa-tag"></i></span>
			<input type="text" v-model="data.url" class="full-width" @blur="update">
			<span class="lbl">URL</span>
		</label>
	</div>	
</template>
<script type="text/javascript">
	export default {
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
					editor: null
				},
				UpdateDesc: false 
			}
		},
		methods: {
			initLayerData () {
				this.data.tidx = this.$store.state.layerData.tidx
				this.data.url = this.$store.state.layerData.url
				this.data.title = this.$store.state.layerData.title
				this.data.description = this.$store.state.layerData.description
			},
			setLayerData () {
				this.$store.state.layerData.tidx = this.data.tidx
				this.$store.state.layerData.url = this.data.url
				this.$store.state.layerData.title = this.data.title
				this.$store.state.layerData.description = this.data.description
			},
			async update () {
				const json = await fetch('/api/task', {
					method: 'put',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify(this.data)
				}).then(res => res.json())
				this.setLayerData ()
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
			}
		}
	}
</script>
<style lang="scss">
.ClassLayer{
	height: auto;
}
.ck-editor__editable {
	min-height: 300px;
}
.task-title {
	line-height: 50px; padding-left: 50px; cursor:pointer;
}
.task-content { min-height: 320.67px; border: solid 2px #eee; border-radius: 7px; padding: 10px;}
</style>