<script>
  export default {
    name: 'Snackbar',
    data() {
      return {
        showSnackbar: false,
        snackbar: {
          color: '' || 'grey darken-4',
          mode: '' || 'multi-line',
          timeout: '' || 4000,
          message: '' || 'no message !!'
        },
        icon: {
          error: 'block',
          success: 'check',
          info: 'info',
          warning: 'warning'
        }
      }
    }, // data
    created() {
      this.$store.watch(state => state.snackbar, () => {
        const snackbarState = this.$store.state.snackbar;

        if(snackbarState.message) {
          this.showSnackbar = true;
          this.snackbar = snackbarState;
          this.snackbar.color = snackbarState.color || snackbarState.type;
        }
      })

    },
  }
</script>

<template>
  <v-snackbar
    v-model="showSnackbar"
    :color="snackbar.color"
    multi-line
    bottom
    right
    :timeout="snackbar.timeout"
    >
        <v-icon left small>{{ snackbar.type ? icon[snackbar.type] : icon[snackbar.color] }}
        </v-icon>
      {{ snackbar.message }}
      <v-btn
        dark
        flat
        @click="showSnackbar = false"
        > Close
      </v-btn>
  </v-snackbar>
</template>

