<template>
  <section>
    <v-container
    fill-height
    fluid
    grid-list-md>
      <v-layout row wrap>

        <v-flex
        xs12
        sm3
        md2>
          <PostSideBar />
        </v-flex>

        <v-flex
        xs12
        sm8
        md8>
          <transition name="fade" mode="out-in">
            <nuxt-child v-bind="$props"/>
          </transition>
        </v-flex>

        <v-flex
          xs12
          sm12
          md2>
          <PostSideBar />
        </v-flex>
        
      </v-layout>
    </v-container>
  </section>
</template>

<script>
  import PostSideBar from '~/components/post/SideBar'

  export default {
    name: 'PostWrapper',
    components: {
      PostSideBar
    },
    props: {

    },

  }
</script>

<style></style>