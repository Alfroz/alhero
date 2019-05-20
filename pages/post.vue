<template>
  <section>
    <v-container>
      <h1 class="display-3">Post Section</h1>
    </v-container>
    <v-container
    fill-height
    fluid>
      <nuxt-child v-bind="$props"/>
    </v-container>
  </section>
</template>

<script>
  export default {
    name: 'PostWrapper',
    props: {

    },
    head: {
      title: '',
      meta: [
        { hid: 'description', name: 'description', content: '' }
      ]
    },
  }
</script>

<style></style>