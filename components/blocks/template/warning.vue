<template>
	<v-container>
		<v-alert
		:value="true"
		color="blue-grey darken-3"
		icon="info"	
		>
			<v-card
			flat
			class="elevation-0"
			color="transparent"
			>
				<v-card-title primary-title class="pa-0">
					<div>
						<div v-if="data.title" class="headline">{{ data.title }}</div>
						<p class="font-weight-light" v-html="data.message"></p>
		      </div>
				</v-card-title>
	    </v-card>
    </v-alert>
	</v-container>	
</template>

<script>
export default {
	name: 'BlockWarning',

  props: {
    data: {
      title: String,
      message: String, 
    }
  },

}
</script>


<style scoped>
</style>
