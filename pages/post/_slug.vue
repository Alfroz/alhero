<template>
  <article>
    <h1 class="display-1 text-xs-center mb-3">{{ post.title }}</h1>
      <template v-for="(block, i) in post.body.blocks">
        <DynamicComponent
          :componentName="block.type"
          :data="block.data"
          :key="i + block.type"
           />
      </template>
  </article>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'PostDetails',
  props: {},

  components: {
    DynamicComponent: () => import('~/components/blocks/template/DynamicComponent')
  },

  async fetch({store, app, error, params}) {
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