import { Axios } from '@/boot/axios'

export function request (context, user) {
    return new Promise((resolve, reject) => {
        context.commit('request')
        Axios.post('/auth/local', user)
            .then( ({ data }) => {
                const token = 'Bearer ' + data.jwt
                // LocalStorage.set('user-token', token)
                Axios.defaults.headers.common["Authorization"] = token;
                context.commit('success', token)
                resolve(data)
            })
            .catch(err => {
                context.commit('error', err)
                // LocalStorage.remove('user-token')
                delete Axios.defaults.headers.common["Authorization"];
                reject(err)
            })
    })
}

export function logout () {
    return new Promise((resolve) => {
        // LocalStorage.remove('user-token')
        delete Axios.defaults.headers.common["Authorization"];
        resolve()
    })
}

