export function request (state) {
    state.status = 'Loading'
}

export function success (state, token) {
    state.status = 'Success'
    state.isAuth = true
    state.token = token
}

export function error (state) {
    state.status = 'Error'
}

