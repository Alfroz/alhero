<template>
	<v-container class="mx-2">
		<p v-html="data.text"></p>
	</v-container>
</template>

<script>
	export default {
		name: "BlockParagraph",
		props: {
			data: {
				text: String
			}
		}
	}
</script>