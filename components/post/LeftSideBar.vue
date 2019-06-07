<template>
	<section>
    <v-btn
      v-if="responsive"
      class="default v-btn--simple"
      dark
      icon
      @click.stop="sidebar = !sidebar"
      >
      <v-icon>{{sidebar ? 'fas fa-angle-double-left' : 'fas fa-stream'}}</v-icon>
    </v-btn>
    <v-navigation-drawer
      id="app-drawer"
      v-model="sidebar"
      app
      dark
      persistent
      clipped
      floating
      width="200"
      mobile-break-point="600"
      class="accent pt-3"
      >
  <v-img
    :src="background"
    height="100%"
  >
    <NavBarRoutes v-if="isAuthenticated" :routes="loggedInNavRoutes" />
  </v-img>
</v-navigation-drawer>
   
</section>
</template>

<script>
  import NavBarRoutes from '~/components/nav-bar-routes'
	export default {
		name: 'PostLeftSideBar',
    components: {
      NavBarRoutes
    },
    data: () => ({
      sidebar: null,
      responsive: false,
      background:'',

      persistentNavRoutes: [
        {
          to: {name: 'post'},
          title: 'Posts',
          icon: 'notes'
        }
      ],

      loggedInNavRoutes: [
        {
          to: {name: 'post-editor'},
          title: 'Create',
          icon: 'fas fa-plus',
        },
        {
          to: {name: 'index'},
          title: 'My Stats',
          icon: 'fas fa-chart-bar',
        },
      ],
      
    }),

    mounted () {
    this.onResponsiveInverted()
    window.addEventListener('resize', this.onResponsiveInverted)
    },
    beforeDestroy () {
      window.removeEventListener('resize', this.onResponsiveInverted)
    },
    methods: {
      
      onResponsiveInverted () {
        if (window.innerWidth < 600) {
          this.responsive = true
        } else {
          this.responsive = false
        }
      }
    }

	}
</script> 