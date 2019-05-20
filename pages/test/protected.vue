<template>
  <section>
    <div v-if="!user">
      Protected page --- only authenticated users can see this
    </div>
    <div v-if="user">
      <div>
        User ID: {{ uid }}
      </div>
      <h3>Current User: {{user.name}}</h3>
      <img v-if="user.avatar" :src="user.avatar" alt="">
      <div>
        All DB Users: {{ allusers }}
      </div>
    </div>
    
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { firestore } from '~/plugins/firebase'



  export default {
    layout: 'protected',
    data () {
      return {
        allusers: []
      }
    },
    components : {
      Froala

    },
    computed: {
      ...mapGetters('user',[
        'uid',
        'user'
      ])
    },
    mounted: function () {
      this.$nextTick(() => {
        //this.readAllUsersFromDB()
      })
    },
    methods: {
      
    }
  }
</script>