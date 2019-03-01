<template>
	<div class="ClassLayer">
		<form v-if="titleToggle">
			<label class="input-label">
				<span class="pre"><i class="fas fa-tag"></i></span>
				<input type="text" name="title" class="full-width" required autofocus>
				<span class="lbl">제목</span>
			</label>
		</form>
		<label class="input-label" v-else>
			<span class="pre"><i class="fas fa-tag"></i></span>
			<p class="task-title full-width" @click="titleState = true">
				<span v-html="title" v-if="!titleState" />
				<input type="text" v-else v-model="title" @focus="titleState = true"  @click="titleState = false" @blur="titleState = false" />
			</p>
		</label>

		<form action="/api/put-class" method="post" @submit.prevent="putClass">
			<ckeditor type="classic" name="description"></ckeditor>
		</form>
		<form>
			<label class="input-label">
				<span class="pre"><i class="fas fa-tag"></i></span>
				<input type="text" name="title" class="full-width" required autofocus>
				<span class="lbl">URL</span>
			</label>
		</form>
	</div>	
</template>
<script type="text/javascript">
	export default {
		data (e) {
			return {
				title: 'title 입력',
				titleState: true
			}
		},
		methods: {
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

</style>