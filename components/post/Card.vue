<template>
	<v-flex
    xs12
    :class="classes">

    <v-card
    tile
    flat
    class="elevation-10"
    color="blue-grey darken-4"
    style="display: flex;
      flex-direction: column;
      border-bottom: 2px solid;
      border-image: linear-gradient(to right, #80d0c7 0%, #13547a 100%);
      border-image-slice: 1;"
    >
      <v-card-title>
       <nuxt-link
        exact
        :to="{
          name: 'post-slug',
          params: {slug: value.slug}
        }"
        style="text-decoration: none">
          <span 
          class="title px-0 font-weight-light white--text">  
            {{ value.title }}
          </span>
        </nuxt-link>
      </v-card-title>

      <v-card-text>
        
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  name: 'PostCard',

  props: {
    size: {
      type: Number,
      required: false
    },
    value: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
      classes () {
        return {
          'md6': this.size === 2,
          'md4': this.size === 3
      }
    }
  },

}
</script>