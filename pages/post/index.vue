<template>
  <section>
    <PostList :queryArray="queryArray"></PostList>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'
  import PostList from '~/components/post/List'
  export default {
    name: 'PostGlobal',
    components: {
      PostList
    },
    data() {
      return {
        queryArray: ['createdAt', '>', 0]
      }
    },
    head: {
      title: 'Posts',
      meta: [
        { hid: 'description', name: 'description', content: '' }
      ]
    },   

    
    async fetch({store, app, error, params}) {
     console.log('Fetch Trigered')
     const queryArray = ['createdAt', '>', 0];

    // if(store.state.post.posts.length < 1) 
      await store.dispatch('post/fetchPosts', [queryArray]).catch(err => error({ statusCode: 404 }))
    },
    

    computed: {
      /*...mapGetters('post',[
      'posts'
      ]),*/
    },

    async beforeDestroy() {
      await console.info('Index - beforeDestroy')
    },

  }
</script>

<style></style>