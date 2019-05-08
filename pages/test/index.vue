<template>
  <v-container
  fluid
  >
    <h1 class="display-4"> Hello Every one</h1>
    <pre>{{ test }}</pre>
    <BaseLazyImg
    v-for="i in 1"
    :key="i"
    src="https://images.unsplash.com/photo-1515229144611-617d3ce8e108?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
    ></BaseLazyImg>
  </v-container>
</template>

<script>
import { firestore } from '@/plugins/firebase'
export default {
  data() {
    return {
      test: ''
    }
  },
  async asyncData({ app, params, error }) {
    const ref = app.$firestore.collection('tests').doc('Sl08nS6hIIHZvsoSD5hX')

    let snap
    try {
      snap = await ref.get()
      //console.log(snap.data())
    } catch (e) {
      console.error(e)
    }
    return {
      test: snap.data()
    }
  }
}
</script>

<style>
</style>