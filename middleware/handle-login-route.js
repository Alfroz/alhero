export default function ({ store, redirect, router }) {
  if (store.getters['user/isAuthenticated']) {
    return redirect('/test/protected')
  }
}