import {
  createNewDocument,
  updateDocument,
  queryData,
  getDocument
} from '~/services/firestore.service.js'

import { firestore } from '~/plugins/firebase';

let postsRef = firestore.collection('posts');


function initialState() {
  return {
    posts: [],
    cached_post: [],
    post: {
      title: '',
      body: '',
      slug: '',
      featImage: null,
      createdAt: '',
      updatedAt: '',
      countViews: 0,
      countFavorites: 0,
      user: {
        username: '',
        uid: ''
      },
      tagsView: [],
      tags: [],
    },

    page: 1,
    perPage: 10,
    lastPostVisible: {},
    nextPostVisible: Object,
    comments: [],
    loadMore: true,
  }
};


// =================================================
// State
// =================================================
export const state = initialState;


// =================================================
// Actions
// =================================================
export const actions = {

  // Create Post
  async createPost ({state, dispatch, commit}, newPost) {
    try {
      await createNewDocument(firestore, 'posts', newPost)
      // set snackbar
      const snackbar = {
        message: "Your post was added !" };
      dispatch('addSnackbar',snackbar, {root: true})

      return newPost;
    }
    catch(error) {
      const snackbar = {
        type: "error",
        message: error,                };
      dispatch('addSnackbar',snackbar, {root: true})
      //return Promise.reject(error);
      throw error
    }
  },

  // Update Post
  async updatePost ({state, dispatch, commit}, newPost) {
    try {
      await updateDocument(firestore, 'posts',state.post.id, newPost)
        // snackbar
        const snackbar = {
          message: "Your post updated  !" };
        dispatch('addSnackbar',snackbar, {root: true})

        return newPost;
    }
      
      catch(error) {
        const snackbar = {
          type: "error",
          message: error,                };
        dispatch('addSnackbar',snackbar, {root: true})
        throw error
      }
  },

  async fetchPost( {commit, dispatch, state},postSlug ){

    // 2. Check if we've already fetched and cached the user.
    const matchedPost = state.cached_post.find((post) => post.slug === postSlug)
    if (matchedPost) {
      console.info('MatchedPost')
      commit('SET_POST', matchedPost );
      return Promise.resolve(matchedPost)
    }


    return postsRef.where('slug','==', postSlug).get()
      .then(docs => {
        
        if (docs.empty) {
          console.log('No matching documents.' + docs );
          return Promise.reject();
        }

        let post = {};
        docs.forEach(doc => {
         
          let menuPost = {
            ...doc.data(),
            id: doc.id
          }; 
          
          post = menuPost;
        })
        commit('SET_POST', post );
        commit('CACHE_POST', post);
        // value for editor
        return Promise.resolve(post);
      })
      .catch(error => {
        console.log('fetchPost catch' + error);
        return Promise.reject()
      }) 
    
  }, // fetchPost

}

// =================================================
// Mutations
// =================================================
export const mutations = {
  CACHE_POST(state, newPost) {
    console.info('Caching Post')
    state.cached_post.push(newPost)
  },

  SET_POST (state, newPost) {
    console.info('MUTATION SET_POST - ' + newPost)
    state.post = newPost;
  },

}

// =================================================
// Getters
// =================================================

export const getters = {
  postBySlug: (state, getters) => (slug) => {
    return state.cached_post.find(post => post.slug === slug)
  },
  posts: state => state.posts,
  post: state => state.post,
  comments: state => state.comments,
  lastPostVisible: state => state.lastPostVisible,
  loadMore: state => state.loadMore

}

