<template>
  <v-container
    grid-list-xl
  >
    
    <v-layout wrap>
      <Card
      v-for="(post, i) in posts"
      :key="post.slug"
      :value="post"
      >
      </Card>
    </v-layout>
    <pre> {{ JSON.stringify(lastVisiblePost.title) }} </pre>

    <v-btn
      color="info darken-1"
      v-if="loadMore"
      :loading="buttonLoader"
      @click="addPosts(); buttonLoader = true">
        <v-icon left small>refresh</v-icon>
        Load...
    </v-btn>
    <h5 class="caption font-weight-light">PostList {{queryArray}}</h5>
  </v-container>

</template>

<script>
import { mapActions, mapState } from 'vuex'
import Card from '~/components/post/Card'
export default {
  name: 'PostList',
  components: {
    Card
  },
  props: {
    queryArray: {
      type: Array,
      default: () => ([]),
    }
  },

  data() {
    return {
      buttonLoader: false,
    }
  },

  computed: {
    ...mapState('post',[
      'posts',
      'lastVisiblePost',
      'loadMore',
    ]),
  },

  methods: {
    async addPosts() {
      await this.$store.dispatch('post/fetchPosts', [ this.queryArray, this.lastVisiblePost.createdAt ])
      .then(() => {
      })
     /* .catch(error => {
        console.error('Failed Access Store - fetchPosts')
      }) */
     
      this.buttonLoader = false;
  
      
    }
  },

}
</script>