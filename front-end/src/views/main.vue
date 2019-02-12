<template>
	<div class="site-wrap">
		<siteHeader />
		<div class="container">
			<div class="container-innner">
				<router-view v-if="$store.state.member"></router-view>
				<template v-else>
					<div>로그인을 해주세요</div>
				</template>
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
			layerTemplate,
		}
	}
</script>