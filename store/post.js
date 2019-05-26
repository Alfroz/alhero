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
    perPage: 1,
    lastVisiblePost: {},
    nextPostVisible: {},
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

  // FETCH POSTS
  async fetchPosts({state, commit}, [ queryArray, startAfter]) {
    console.info('[ACTION] - FetchPosts')
    console.info('[ACTION] - queryArray ' + queryArray)
    startAfter ? console.info('[ACTION] - startAfter ' + startAfter) : ''

    let queryRef = postsRef
    .where(...queryArray)
    .orderBy('createdAt', 'desc') ;

    let snapshot = startAfter 
    ? await queryRef
      .startAfter(startAfter)
      .limit(state.perPage)
      .get()
    : await queryRef
      .limit(state.perPage)
      .get()

      if(snapshot.empty) {
        console.info('FetchPosts - Empty Snapshot')
        return 
      }
      let lastPost = await snapshot.docs[snapshot.docs.length-1];
      lastPost = {...lastPost.data(),
        id: lastPost.id}
      

      let posts = [];
      for (const doc of snapshot.docs) {
        console.log('DATA - ' + doc.data() )
        let post = { ...doc.data(),
          id: doc.id }
          posts.push(post)
      }

      commit('SET_POSTS', posts )
      commit('SET_LAST_POST', lastPost)
  },

  // CREATE POST
  async createPost ({state, dispatch, commit}, newPost) {
    try {
      await createNewDocument(firestore, 'posts', newPost)
      // set snackbar
      const snackbar = {
        message: "Post Created !" };
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

  // UPDATE POST
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
          message: error };
        dispatch('addSnackbar',snackbar, {root: true})
        throw error
      }
  },

  // FETCH POST
  async fetchPost( {commit, dispatch, state},postSlug ){

    // 1. Check if we've already fetched and cached the post.
    const matchedPost = state.cached_post.find((post) => post.slug === postSlug)
    if (matchedPost) {
      console.info('MatchedPost')
      commit('SET_POST', matchedPost );
      return Promise.resolve(matchedPost)
    }

    // Query the database (Firestore)
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
  SET_POSTS(state, newPosts) {
    //metode 1
    newPosts.forEach((i) => {
      state.posts.push(i)
    })
    // metode 2
   // Object.assign(state.posts, newPosts)
  },

  SET_LAST_POST(state, lastVisiblePost) {
    state.lastVisiblePost = lastVisiblePost
  },

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
  lastVisiblePost: state => state.lastVisiblePost,
  loadMore: state => state.loadMore

}

