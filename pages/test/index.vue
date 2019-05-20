<template>

  <v-container
  fluid
  > 
    <BaseLazyWrapper :loading="loading">
      <h2 class="display-2"> Hello Every one {{ isAuthenticated ? 'Login' : 'Logout' }}</h2>
    </BaseLazyWrapper> 
    <BaseTwitterHeadCard />
    
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
  name: 'TestPage',
  head: {
    title: 'Test Page',
    meta: [
      { hid: 'description', name: 'description', content: 'Test page description' }
    ]
  },
  data() {
    return {
      test: '',
      loading: true,
    }
  },
  async asyncData({ app, params, error }) {
    const ref = firestore.collection('tests').doc('Sl08nS6hIIHZvsoSD5hX')

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
  },

  mounted() {
    console.log('lifecyclehook Mounted')
    setInterval( () => {(this.loading = false)}, 4000)
  }
}
</script>

<style>
</style>