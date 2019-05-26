<template>
  <v-container>
    <h2 class="display-2 text-xs-center mb-3">{{ post.title }}</h2>
    <div v-html="post.body"></div>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'PostDetails',
  props: {
  

  },
  async fetch({store, app, error, params}) {
    console.log('Fetch Trigered')
   await store.dispatch('post/fetchPost', params.slug).catch(err => error({ statusCode: 404 }))
  },
  head() {
      return {
          title: this.post.title || '',
          meta: [
              {
                  hid: 'keywords',
                  name: 'keywords',
                  content: this.post.tags ? this.post.tags.map(i => i.name).join('，') : '',
              },
              {
                  hid: 'description',
                  name: 'description',
                  content: this.post.title,
              },
          ],
          link: [
            { rel: 'stylesheet', 
              href: 'https://cdn.jsdelivr.net/npm/froala-editor@3.0.0-beta.1/css/froala_editor.pkgd.min.css',
              type: 'text/css'
            }
          ]
      }
  },
  computed: {
    ...mapGetters('post', [
      'post'
    ]), 
  },
}
</script>

<style></style>