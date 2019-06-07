<template>
    <v-template>
      <PostLeftSideBar />
      <v-container
      fill-height
      fluid
      grid-list-sm
      pa-0>
      
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
    </v-template>
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
      script: [
        { 
          src: '/froala-editor/js/froala_editor.min.js',
          type: 'text/javascript',
          async: true
        }
      ]
    }

  }
</script>

<style></style>