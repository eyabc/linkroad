<template>
	<div class="layer" v-if="$store.state.layerState !== false">
		<span class="middle"></span>
		<div>
			<a href="#" class="close" @click.prevent="close"><i class="fas fa-times"></i></a>
			<component :is="$store.state.layerState"/>
		</div>	
	
	</div>
</template>
<script>
	export default {
		components: {
		},
		methods: {
			close() {
				this.$store.commit('closeLayer')
			}
		}
	}
</script>