export default function ({ store, app, route, redirect }) {
    const user = store.state.user;
    if (route.path === '/auth/signin' || route.path === '/' || route.path === '') {
        if (user) {
            return redirect('/profile')
        }
    }

    if (route.path !== '/auth/signin' && route.path !== '/' && route.path !== '') {
        console.log('from middleware', user)
        if (!user) {
            return redirect('/auth/session')
        }
    }

}
