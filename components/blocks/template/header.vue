<template>
	<div>
		<v-container class="mt-2"
		  :tag=" 'h' + data.level " 
		  v-html=" data.text " />
	</div>
</template>

<script>
	export default {
		name: "Header",
		props: {
			data: {
				text: String,
				level: String,
			}
		},
	}
</script>