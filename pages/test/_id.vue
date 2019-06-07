<template>
  <div>
	<h2 class="display-2"> {{ $route.params.id }} </h2>
  <v-faicon name="brands/vuejs"  />


</div>
</template>

<script>
  // import the component
 
  // only import the icons you use to reduce bundle size
  import 'vue-awesome/icons/brands/vuejs'

	export default {
		name: 'Test-id',
  
		data: () => ({
		})
	}
</script>