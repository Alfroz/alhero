<template>
  <v-app
  dark
  class="accent"
  >
    <Navbar />
    <v-content>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-content>
    <Snackbar />
    <Footer />
  </v-app>
</template>

<script>
import Snackbar from '~/components/TheSnackbar';
import Navbar from '~/components/TheNavbar'
import Footer from '~/components/TheFooter'

export default {
  components: {
    Snackbar,
    Navbar,
    Footer
  },
  data() {
    return {
      title: 'aLhero',
    }
  }
}
</script>
