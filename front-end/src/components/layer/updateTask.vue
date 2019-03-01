<template>
	<div class="ClassLayer">
		<form>
			<label class="input-label">
				<span class="pre"><i class="fas fa-tag"></i></span>
				<input type="text" name="title" class="full-width" required autofocus>
				<span class="lbl">제목</span>
			</label>
		</form>

		<form action="/api/put-class" method="post" @submit.prevent="putClass">
			<label class="input-label">
				<span class="pre"><i class="fas fa-info"></i></span>
				<textarea name="description" class="full-width"></textarea>
				<span class="lbl">상세설명</span>
			</label>
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

<style lang="scss">
.ClassLayer{
	height: auto;
}

</style>