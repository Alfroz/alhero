<template>
  <v-container id="updatePost" fluid>
  <Editor action="updatePost" />
</v-container>
</template>

<script>
  import Editor from '~/components/post/Editor'
  export default {
    name: 'PostEditorSlug',
    middleware: ['authenticated'],
    components: {
      Editor
    },
    head: {
      script: [
        { src: '/froala-editor/js/plugins.pkgd.min.js',
          type: 'text/javascript',
        }
      ],
      link: [
        { rel: 'stylesheet', 
          href: '/froala-editor/css/froala_editor.pkgd.min.css',
          type: 'text/css'
        },
        { rel: 'stylesheet', 
          href: '/froala-editor/css/themes/dark.min.css',
          type: 'text/css'
        }
      ]   
    },

    async fetch({context, store, app, params, error}) {
      const currentSlug = params.slug;
    
      console.log('currentSlug' + currentSlug)
     
      await store.dispatch('post/fetchPost', currentSlug)
      .then((post) => {
        this.post = post;
        if (post.user.uid !== store.state.user.user.uid) {
          error({ statusCode: 404, message: 'not authorized' })
        }
      })
      .catch((err) =>{
        error ({
          statusCode: 404,
          message: 'Post tidak di temukan'})
        })
      
  },

  }
</script>