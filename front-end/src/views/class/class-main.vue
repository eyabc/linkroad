<template>
	<div class="box1">
		<h1 class="box-title">{{ }} Class 정보</h1>
	</div>
</template>
<script type="text/javascript">
	export default {
		data () {
			return {
				classInfo: null
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
			}
		}

	}
</script>