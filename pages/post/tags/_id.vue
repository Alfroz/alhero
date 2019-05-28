<template>
  <v-container>
    Posts - Tags {{ tag }}
    <PostList :queryArray="queryArray"></PostList>
  </v-container>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import PostList from '~/components/post/List'
  import {tagify} from '~/filters/tagify';

	export default {
		name: 'PostTagsId',

    components: {
      PostList
    },

    data() {
      return {
        queryArray: ['tags', 'array-contains', tagify(this.$route.params.id) ]
      }
    },

    head: {
      title: 'Posts by Tag ',
      meta: [
        { hid: 'description', name: 'description', content: '' }
      ]
    }, 

    async fetch({params, store, error}) {
      // Dibutuhkan Firestore Index
      //
      const queryArray = [ 'tags', 'array-contains', tagify(params.id) ];

     // if(store.state.post.posts.length < 1) 
      await store.dispatch('post/fetchPosts', [queryArray])//.catch(err => error({ statusCode: 404 }))
    },

    computed: {
      tag() {
        return this.$route.params.id
      }
    },
	}
</script>