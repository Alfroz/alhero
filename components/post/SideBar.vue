<template>
	<v-responsive>
    <v-btn
      v-if="responsive"
      class="default v-btn--simple"
      dark
      icon
      @click.stop="sidebar = !sidebar"
      >
      <v-icon>notes</v-icon>
    </v-btn>
    <v-navigation-drawer
      id="app-drawer"
      v-model="sidebar"
      :app="responsive"
      dark
      floating
      width="200"
      mobile-break-point="600"
      :class="responsive ? 'blue-grey darken-4' : 'accent' "
      >
  <v-img
    :src="image"
  >
    <NavBarRoutes v-if="isAuthenticated" :routes="loggedInNavRoutes" />
  </v-img>
</v-navigation-drawer>
   
</v-responsive>
</template>

<script>
  import NavBarRoutes from '~/components/nav-bar-routes'
	export default {
		name: 'PostSideBar',
    components: {
      NavBarRoutes
    },
    data: () => ({
      sidebar: null,
      responsive: false,
      image:'',
      persistentNavRoutes: [
        {
          to: {name: 'post'},
          title: 'Posts',
          icon: 'notes'
        }
      ],
      loggedInNavRoutes: [
        {
          to: {name: 'post-editor-slug', params: {slug: 'new'}},
          title: 'Create',
          icon: 'details',
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