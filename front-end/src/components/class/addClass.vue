<template>
	<div class="addClassLayer">
		<form action="" method="post" @submit.prevent="">
			<ul class="fields">
					<label class="input-label">
						<span class="pre"><i class="fas fa-tag"></i></span>
						<input type="text" name="title" class="full-width" required autofocus>
						<span class="lbl">제목</span>
					</label>
				</li>
				<li>
					<label class="input-label">
						<span class="pre"><i class="fas fa-info"></i></span>
						<textarea name="description" class="full-width" required autofocus></textarea>
						<span class="lbl">상세설명</span>
					</label>
				</li>
			</ul>
			<button class="btn" type="submit">Class 추가</button>
		</form>
	</div>	
</template>
<script type="text/javascript">
	
</script>