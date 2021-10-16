export default function ({ store, app, route, redirect }) {
    const user = store.state.user;
    console.log('from middleware', user)

    if (route.path === '/auth/signin' || route.path === '/' || route.path === '') {
        if (user) {
            return redirect('/profile')
        }
    }

    if (route.path !== '/auth/signin' && route.path !== '/auth/signup' && route.path !== '/auth/resetpassword' && route.path !== '/' && route.path !== '') {
        if (!user) {
            return redirect('/auth/session')
        }
    }

}
