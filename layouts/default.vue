<template>
  <v-app
  dark
  class="accent"
  >
    <NavBar />
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <Snackbar />
  </v-app>
</template>

<script>
import Snackbar from '~/components/snackbar';
import NavBar from '~/components/nav-bar'

export default {
  components: {
    Snackbar,
    NavBar
  },
  data() {
    return {
      title: 'Vuetify.js',
    }
  }
}
</script>
