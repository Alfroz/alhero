<template>
	<v-flex
    xs12 
    xs12
    md6
    lg4
    :class="classes"
    d-flex>
    <v-hover>
      <v-card
      flat
      color="blue-grey darken-3"
      slot-scope="{ hover }"
      style="display: flex;
        flex-direction: column;
        border-bottom: 2px solid;
        border-image: linear-gradient(to right, #80d0c7 0%, #13547a 100%);
        border-image-slice: 1;"
      >
        <v-card-actions>
          <v-expand-transition>
            <v-btn
              v-if="hover"
              flat
              icon
              class="transition-fast-in-fast-out"
              style="position: absolute; right: 5px; top: 5px;z-index: 10"
              >
              <v-icon class="white--text">far fa-bookmark</v-icon>
            </v-btn>
          </v-expand-transition>
        </v-card-actions>    
        <BaseLazyImg
        v-if="value.featImage"
        :src="value.featImage "
        max-height="200"
          />
        <v-card-title class="grow">
          <div>
          <div class="headline font-weight-regular">
         <nuxt-link
          exact
          :to="{
            name: 'post-slug',
            params: {slug: value.slug}
          }"
          style="text-decoration: none">
            <span 
            class="white--text">  
              {{ value.title }}
            </span>
          </nuxt-link>
        </div>
        <div>
          <span class="caption font-weight-thin text--darken-2">
            {{ value.createdAt | date() }}
          </span>
        </div>
        </div>
        </v-card-title>

        <v-card-text>
          <template v-if="hasTags">
            <v-icon small>label</v-icon>
            <v-chip
            v-for="(tag, i) of value.tagsView"
            :key="i"
            label
            small
            class="mr-1"
            color="accent"
            @click="toPostsByTag(tag)"
            >
              <nuxt-link class="white--text" style="text-decoration: none" :to="{name: 'post-tags-id', params: {id: tag}}"> {{ tag }} </nuxt-link>
            </v-chip>
          </template>
        </v-card-text>

      </v-card>
    </v-hover>
  </v-flex>
</template>

<script>
import date from '~/filters/date'
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
  filters:{
    date
  },
  methods: {
    toPostsByTag(tag) {
      this.$router.push({name: 'post-tags-id', params: {id: tag}})
    },

    
  },

  computed: {
      classes () {
        return {
          'md6': this.size === 2,
          'md4': this.size === 3
      }
    },

    hasTags() {
      return this.value.tagsView.length !== 0
    }
  },

}
</script>