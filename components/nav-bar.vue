<script>
export default {
  name: 'NavBar',
  data() {
    return {
      drawer: null,
      mini: false
    }
  }
}
</script>

<template>
  <section>
	<v-navigation-drawer
  v-model="drawer"
  :mini-variant="mini"
  dark
  app
  fixed
  right
  width="240"
  floating
  class="blue-grey darken-4"
  >
    <v-list>
      <v-list-tile @click.stop="mini = !mini">
        <v-list-tile-action>
          <v-icon v-if="mini"> chevron_left </v-icon>
          <v-icon v-else> chevron_right </v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title
          class="font-weight-light"
          >
            .minimize.
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>

  <v-toolbar
  dark
  scroll-off-screen
  app
  flat
  color="accent">
    <v-toolbar-title>
      <v-btn
      flat
      icon
      exact
      class="ma-0 pa-0"
      >
        <v-icon>whatshot</v-icon>
      </v-btn>
    </v-toolbar-title>

    <v-spacer></v-spacer>
    <v-toolbar-side-icon
    @click.stop="drawer = !drawer"
    >      
    </v-toolbar-side-icon>
  </v-toolbar>
</section>
</template>