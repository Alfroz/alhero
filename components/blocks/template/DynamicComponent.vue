<template>
	<component :is="componentFile" :data="data"></component>
</template>

<script>
	export default {
		name: 'DynamicComponent',
		props: {
			componentName: String,
			data: Object
		},
		computed: {
			componentFile() {
				return () => import(`~/components/blocks/template/${this.componentName}.vue`);
			}

		},
	}
</script>