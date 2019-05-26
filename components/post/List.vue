<template>
  <v-container
    grid-list-xl
  >
    <h5 class="caption font-weight-light">PostList {{queryArray}}</h5>
    <v-layout wrap>
      <Card
      v-for="(post, i) in posts"
      :key="post.slug"
      :size="layout[i]"
      :value="post"
      >
      </Card>
    </v-layout>
    <pre> {{ JSON.stringify(lastVisiblePost.title) }} </pre>

    <v-btn
      color="blue-grey darken-4"
      v-if="loadMore"
      :loading="buttonLoader"
      @click="addPosts(); buttonLoader = true">
        <v-icon left small>refresh</v-icon>
        Load...
    </v-btn>
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
      layout: [2, 2, 1, 2, 2, 3, 3, 3, 3, 3, 3],
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
      this.$store.dispatch('post/fetchPosts', [ this.queryArray, this.lastVisiblePost.createdAt ])
      .then(() => {
        this.buttonLoader = false;
      })
      .catch(error => {
        console.error('Failed Access Store - fetchPosts')
      })
    }
  },

}
</script>