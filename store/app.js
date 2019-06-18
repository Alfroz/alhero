

function initialState() {
  return {
    hasLeftSidebar: false,
    leftSidebar: null
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

}

// =================================================
// Mutations
// =================================================
export const mutations = {
    HAS_LEFTSIDEBAR(state, val) {
    state.hasLeftSidebar = val
  },

  SET_LEFTSIDEBAR(state, val) {
    state.leftSidebar = val
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

