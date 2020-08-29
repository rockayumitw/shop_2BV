export default ({ store, redirect }) => {
  console.log(store.getters['auth/check'])
  if (store.getters['auth/check']) {
    return redirect('/')
  }
}