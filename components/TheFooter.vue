<template>
  <v-footer class="blue-grey darken-4" height="auto">
  	<v-layout
      justify-center
      row
      wrap
    >
	    <v-btn v-for="icon in icons" :key="icon" class="mx-3 white--text" icon>
	      <v-icon size="24px">{{ icon }}</v-icon>
	    </v-btn>
    </v-layout>
  </v-footer>
</template>

<script>
  export default {
    data: () => ({
      icons: [
        'whatshot',
        'face',
        'details'
      ]
    })
  }
</script>