
export function isAuthenticated (state) {
    return !!state.isAuth
}

export function authStatus (state) {
    return state.status
}

