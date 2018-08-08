import api from '@constants/api'
import sha256 from 'sha256'
import md5 from 'md5'

export default class {
    static isAuthenticated = () => {
        return fetch(`${api}/verify`, {
            credentials: 'include'
        })
    }

    static getHash = password => {
        const salt1 = 'AQRp;S~G=&rG!>}rso!A3<B-[j?uO5f/--Z5v8Af=Qo+L?=Xe8=i[wyNBFn!HyB'
        const salt2 = '#!cgW0mbPC&r*_m>Kozn{.H=)W^3YB>_5i@>_{f_tV+m*l\'}Ff/&r3\'kx!9NlX)'
        const salt3 = '4PH}d9wj=cl-RzQ\'YUvezTwzGv0a+*Qt@`2H.Gh;e$}jJu9>UxSY5f<kX@$gNU~'
        return sha256(md5(salt1 + password + salt2) + salt3)
    }

    static authenticate = (action, user) => {
        return fetch(`${api}/${action}`, {
            method: 'POST',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(user),
            credentials: 'include'
        })
    }

    static logout = () => {
        return fetch(`${api}/logout`, {
            credentials: 'include'
        })
    }
}