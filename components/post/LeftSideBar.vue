<template>
	<section>
    
    <v-navigation-drawer
      id="app-drawer"
      v-model="drawer"
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
  import { mapState, mapMutations } from 'vuex'
  import NavBarRoutes from '~/components/nav-bar-routes'
	export default {
		name: 'PostLeftSideBar',
    components: {
      NavBarRoutes
    },
    data: () => ({
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

    computed: {
      ...mapState('app', ['hasLeftSidebar', 'leftSidebar']),

       drawer: {
        get() {
          return this.leftSidebar
        },
        set(val) {
          this.SET_LEFTSIDEBAR(val)
        }
       },

    },

    mounted () {
      this.HAS_LEFTSIDEBAR(true)

      this.onResponsiveInverted()
      window.addEventListener('resize', this.onResponsiveInverted)
      },
    beforeDestroy () {
      this.HAS_LEFTSIDEBAR(false)
      window.removeEventListener('resize', this.onResponsiveInverted)
    },

    methods: {
      ...mapMutations('app', ['HAS_LEFTSIDEBAR', 'SET_LEFTSIDEBAR']),
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