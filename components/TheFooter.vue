<template>
  <v-footer  class="blue-grey darken-4 mt-5" height="auto" absolute>
  	<v-layout
      row
      wrap
    >
	    <v-btn v-for="(icon, i) in icons" :key="i" class="mx-3 white--text" icon :href="icon.link" target="_blank">
	      <v-icon size="20px">{{ icon.i }}</v-icon>
	    </v-btn>
    </v-layout>
  </v-footer>
</template>

<script>
  export default {
    data: () => ({
      icons: [
        {
          i: 'fab fa-vuejs',
          link: 'http://vuejs.org'
        },
        {
          i: 'face',
          link: ''
        }
      ]
    })
  }
</script>