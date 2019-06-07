<template>
  <v-container fluid id="createPost">
    <Editor action="createPost" />
</v-container>
</template>

<script>
  import Editor from '~/components/post/Editor'
	export default {
    name: 'PostEditorIndex',
    middleware: ['authenticated'],
    components: {
      Editor,
    },


    async fetch({store, error}) {
      await store.commit('post/SET_POST', {})
    }

  }
</script>