import {getUserFromCookie, getUserFromSession} from '@/helpers/firebase'

export const actions = {

  async nuxtServerInit ({ dispatch }, { req }) {
    const user = getUserFromCookie(req)
    if (user) {
      await dispatch('user/setUSER', { name: user.name, email: user.email, avatar: user.picture, uid: user.user_id})
    }
  }
}