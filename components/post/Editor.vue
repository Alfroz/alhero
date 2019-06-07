<template>
  <section>
    <v-form ref="postEditor" v-model.lazy="valid" lazy-validation class="font-weight-light">
    <v-layout row wrap>
   <!--<h1 class="mb-5 title"><v-icon>notes</v-icon> {{ $route.params.slug ? 'Update' : 'Create' }} Post</h1>-->
    
      
      <v-flex xs12 sm12 md12>
        <v-text-field v-model.lazy="post.title" :rules="titleRules" class="display-1 mb-3" placeholder="Title" full-width single-line required></v-text-field>
      </v-flex>
      
      <!--<v-flex xs12 sm12 md12>
        <v-textarea  v-model.lazy="post.body" :rules="bodyRules" placeholder="Write here" full-width rows="5" required></v-textarea>
      </v-flex>-->
      
      <v-flex xs12 sm12 md12>
        <div id="editor-wrapper" class="mb-5" style="min-height: 200px">
          <div id="froala-editor" class=""></div>
        </div>

      </v-flex>
      
      
      <v-flex xs12 sm5>
        <v-combobox class="mb-3" v-model.lazy="post.tagsView" :items="items" :search-input.sync="search" hide-selected hint="Maximum 5 tags" placeholder="Tags" multiple persistent-hint box>
          <template v-slot:selection="data">
            <v-chip close label :key="JSON.stringify(data.item)" :selected="data.selected" :disabled="data.disabled" class="v-chip--select-multi" @input="data.parent.selectItem(data.item)">
              <span>{{ data.item }}</span>
            </v-chip>
          </template>
          <template v-slot:no-data>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>
                  No results matching "<strong>{{ search }}</strong>". Press <kbd>enter</kbd> to create a new one
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-combobox>
      </v-flex>
      
      <v-flex xs12 sm5>
        <div v-if="post.featImage && validateImage(post.featImage)" row justify-center py-2 class="text-xs-center">
          <no-ssr max-width="400px" max-height="400px">
            <v-img :src="post.featImage"></v-img>
          </no-ssr>
        </div>
        <v-text-field v-model.lazy="post.featImage" :rules="featImageRules" label="Featured image (optional)" placeholder="https://" box single-line></v-text-field>
      </v-flex>
      
      
      <v-btn color="primary" :disabled="!valid" @click="setPost()">Post</v-btn>
    
   
      </v-layout>
    </v-form>  
  </section>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import { slugify } from '~/filters/slugify'
import { tagify } from '~/filters/tagify'

export default {
  name: 'PostEditor',
  filters: {
    slugify,
    tagify
  },

  head: {
    script: [
      { 
        src: '/froala-editor/js/plugins.pkgd.min.js',
        type: 'text/javascript',
        async: true,
        preload: true
      }
    ],
    link: [
      { rel: 'stylesheet', 
        href: '/froala-editor/css/froala_editor.pkgd.min.css',
        type: 'text/css'
      },
    ]   
  },

  props: {
    //post: Object,
    action: {
      type: String,
      required: true,
      default: 'createPost'
    }
  },

  data() {
    return {
      valid: false,
      editor: false,
      editor: null,
      titleRules: [
        v => !!v || 'Title is required',
        v => v && v.length >= 5 || 'Field must be grater than 5 characters'
      ],
      bodyRules: [
        v => !!v || 'Content is required',
        v => v && v.length >= 20 || 'Field must be greater than 20 characters'
      ],
      featImageRules: [
       // v => v !== null && this.validateImage(v) || 'Invalid image URL'
      ],
      items: ['Gaming', 'Programming', 'Vue'],
      search: null
    }
  }, // data

  mounted() {
       this.myEditor();
   
  }, // mounted


  watch: {
    tags(val) {
      if (val.length > 5) {
        this.$nextTick(() => this.tags.pop())
      }
    }
  }, //watch

  methods: {
    ...mapActions('post', [
      'createPost',
      'updatePost'
    ]),

    async myEditor() {
      
       
        let that = this
        this.editor =  new FroalaEditor('#froala-editor',{
          theme: 'dark',
          toolbarInline: true,
          charCounterCount: false,
          toolbarVisibleWithoutSelection: true,
          events: {
            'initialized': function () {
            // Do something here.
            // this is the editor instance.
            console.info('Froala Initialized')
            this.html.set(that.post.body)
            }
          }       
        })
      
    },

    async setPost() {
      if (this.$refs.postEditor.validate()) {


        //let action = slug ? this.updatePost : this.createPost;

        await this[this.action] ({
            title: this.post.title || '',
            body: this.editor.html.get(),

           // body: this.post.body || '',
            slug: this.post.title ? slugify(this.post.title) + '-' + this.slugPrefix() : '',
            featImage: this.post.featImage || null,
            createdAt: this.post.createdAt || new Date().getTime(),
            updatedAt: new Date().getTime(),
            countViews: 0,
            countFavorites: 0,
            user: {
              username: this.user.email,
              uid: this.user.uid
            },
            tagsView: this.post.tagsView ? this.formatTags() : [],
            tags: this.post.tagsView ? this.formatTags(true) : [],
            })

          .then((dataPost) => {
         
            
            console.log('dataPost ' + dataPost.id);
            this.$router.push({
              name: 'post-slug',
              params: { slug: dataPost.slug }
            });

          })
          .catch((error) => {
            console.error('Error adding document: ', error);
        
          })
      }
    }, // addPost

    slugPrefix() {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (var i = 0; i < 7; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    },

    /*
    validURL(str) {
      var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
      return !!pattern.test(str);
    },
    */

    validateImage(url) {
      if (url && process.client) {
        var img = new Image();
        img.src = url;
        //  console.log(!!img.naturalWidth)
        return !!img.naturalWidth;
      } else {
        return true;
      }
    }, 

    formatTags(v = false) {
      let x = this.post.tagsView;
      if (v) {
        x = x.map(function(x) { return tagify(x) })
      }
      x = x.map(function(x) { return x.replace(/\s/g, '') })
      return x;
    },


  }, // methods
  computed: {
     ...mapGetters('post', [
      'post'
    ]), 
   /*post() {
      return this.$store.getters['post/postBySlug'](this.$route.params.slug)
    }*/
  }, // computed

  /*beforeDestroy() {
    //empty the Post
    if(this.editor) this.editor.destroy
    console.info('beforeDestroy')
    //this.$store.commit('post/SET_POST', {})

  },*/
  /*async beforeRouteUpdate(to, from, next) {
    console.info('beforeRouteUpdate')
    await this.$store.commit('post/SET_POST', {})
    next();
  },*/
}

</script>

<style scoped>

</style>
