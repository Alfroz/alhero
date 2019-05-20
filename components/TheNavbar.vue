<template>
  <section>
  	<v-navigation-drawer
    v-model="drawer"
    :mini-variant="mini"
    dark
    app
    fixed
    right
    width="300"
    floating
    class="accent"
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

      <NavBarRoutes :routes="persistentNavRoutes" />
      <NavBarRoutes v-if="isAuthenticated" :routes="loggedInNavRoutes" />
      <NavBarRoutes v-else :routes="loggedOutNavRoutes" />

    </v-navigation-drawer>

    <v-toolbar
    dark
    scroll-off-screen
    app
    flat
    class="accent">
      <v-toolbar-title 
      color="transparent"
      class="ma-0 pa-0">
        <v-btn 
        flat 
        icon
        color="transparent"
        :to="{ name: 'index'}" 
        class="pa-0 ma-0"
        exact>
          <v-icon class="white--text ">whatshot</v-icon>
        </v-btn>
        <span class="hidden-xs-only">Title</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon
      @click.stop="drawer = !drawer"
      >      
      </v-toolbar-side-icon>
    </v-toolbar>
  </section>
</template>

<script>
import NavBarRoutes from './nav-bar-routes'

export default {
  name: 'NavBar',
  components: {
    NavBarRoutes
  },
  data() {
    return {
      drawer: null,
      mini: false,
      persistentNavRoutes: [
        {
          name: 'index',
          title: 'Home',

        },
        {
          name: 'post',
          title: 'Posts',
          icon: 'notes'
        }
      ],
      loggedInNavRoutes: [
        {
          name: 'auth-logout',
          title: 'Logout',
          icon: 'exit_to_app',
        },
      ],
      loggedOutNavRoutes: [
        {
          name: 'auth-login',
          title: 'Login',
          icon: 'account_circle',
        },
      ]
    }
  }
}
</script>