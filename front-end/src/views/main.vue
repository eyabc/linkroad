<template>
	<div class="site-wrap">
		<siteHeader />
		<div class="container">
			<div class="container-innner">
			</div>
		</div>
		<siteFooter />
		<layerTemplate />
	</div>
</template>
<script>
	import siteHeader from '@/components/header'
	import siteFooter from '@/components/footer'
	import layerTemplate from '@/components/layerTemplate'
	export default {
		components: {
			siteHeader, 
			siteFooter,
			layerTemplate
		}
	}
</script>