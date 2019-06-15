<template>
    <v-container
      fill-height
      fluid
      grid-list-sm
      pa-0>
      <PostLeftSideBar />
        <v-layout row wrap>
          <v-flex
          xs12
          sm12
          md9
          lg10
          >
            <transition name="fade" mode="out-in">
              <nuxt-child v-bind="$props"/>
            </transition>
          </v-flex>

          <v-flex
            xs12
            sm12
            md3
            lg2>
          </v-flex>
          
        </v-layout>
      </v-container>
</template>

<script>
  import PostLeftSideBar from '~/components/post/LeftSideBar'

  export default {
    name: 'PostWrapper',
    components: {
      PostLeftSideBar
    },
    props: {

    },
    head: {
      
    }

  }
</script>

<style></style>