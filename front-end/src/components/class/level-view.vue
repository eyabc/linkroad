<template>
	<div class="level-contents">
		<header class="header">
			<h1>level</h1>
			<span class="title-friend" v-if="!putTaskState"><i @click="putTaskToggle" class="fas fa-plus"></i ></span>
			<span class="title-friend" v-else><i @click="putTaskToggle" class="fas fa-times"></i></span>
		</header>
		<div class="tasks">
			<form action="" method="post" v-if="putTaskState" @submit.prevent="test">
				<input type="text" name="title" placeholder="Title">
				<input type="text" name="url" placeholder="URL">
				<button type="submit"></button>
			</form>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		created () {
			
		},
		data () {
			return {
				putTaskState: false,
			}
		},
		methods: {
			putTaskToggle () {
				if(this.putTaskState){
					this.putTaskState = false
				} else {
					this.putTaskState = true
				}
			},
			test () {
				console.log("test")
			}
		}
	}
</script>
<style lang="scss">
.level-contents {
	width: 300px;
	header { border-bottom: #09f solid 2px; display: flex; justify-content: space-between;}
	h1 {font-size: 20px;}
	input { height: 20px; width: 100%; padding: 0; border-color: #ddd; padding: 0 10px; box-sizing:border-box}
}
.tasks{
	margin: 8px
	button {display:none}
}
</style>