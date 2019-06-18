<template>
  <section>
  	<v-navigation-drawer
    v-model="drawer"
    :mini-variant="mini"
    dark
    app
    fixed
    right
    width="200"
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
              Menu
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <NavBarRoutes :routes="persistentNavRoutes" />
      <NavBarRoutes v-if="isAuthenticated" :routes="loggedInNavRoutes" />
      <NavBarRoutes v-else :routes="loggedOutNavRoutes" />

    </v-navigation-drawer>

    <v-toolbar
    app
    dark
    scroll-off-screen
    flat
    dense
    clipped-left
    class="accent">
    <template v-if="hasLeftSidebar">
      <v-btn
        v-if="responsive"
        class="default v-btn--simple"
        dark
        icon
        @click.stop="SET_LEFTSIDEBAR"
        >
        <v-icon left>fas fa-angle-double-right</v-icon>
      </v-btn>
    </template>

      <v-toolbar-title 
      color="transparent"
      class="ma-0 pa-0">
        <v-btn 
        flat 
        
        :to="{ name: 'index'}" 
        class="pa-0 ma-0"
        exact>
          <span class="font-weight-bold teal--text text--lighten-2">al</span>
          <span class="font-weight-regular">Hero</span>
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

<script>
import NavBarRoutes from './nav-bar-routes'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'NavBar',
  components: {
    NavBarRoutes
  },
  data() {
    return {
      drawer: null,
      responsive: false,
      mini: false,
      persistentNavRoutes: [
        {
          to: {name: 'post'},
          title: 'Posts',
          icon: 'fas fa-file-alt'
        }
      ],
      loggedInNavRoutes: [
        {
          to: {name: 'auth-logout'},
          title: 'Logout',
          icon: 'fas fa-sign-out-alt',
        },
      ],
      loggedOutNavRoutes: [
        {
          to: {name: 'auth-login'},
          title: 'Login',
          icon: 'fas fa-sign-in-alt',
        },
      ]
    }
  },
  computed: {
    ...mapState ('app',
      ['hasLeftSidebar', 'leftSidebar']),
  },

  methods: {
    ...mapMutations('app',['SET_LEFTSIDEBAR']),

    onResponsiveInverted () {
      if (window.innerWidth < 600) {
        this.responsive = true
      } else {
        this.responsive = false
      }
    },

  },

  mounted () {
    this.onResponsiveInverted()

    window.addEventListener('resize', this.onResponsiveInverted)
    },

  beforeDestroy () {
    window.removeEventListener('resize', this.onResponsiveInverted)
  },
}
</script>