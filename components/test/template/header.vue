<template>
	<div>
		<v-container class="mx-2"
		  :tag=" 'h' + data.level " 
		  v-html=" data.text " />
	</div>
</template>

<script>
	export default {
		name: "Header",
		props: {
			data: Object
		},
	}
</script>