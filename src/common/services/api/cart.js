import api from '@constants/api'

export default class {
    static getCartInfo = () => {
        return fetch(`${api}/cart/info`, {
            credentials: 'include'
        })
    }

    static getCartProducts = () => {
        return fetch(`${api}/cart`, {
            credentials: 'include'
        })
    }

    static placeOrder = () => {
        return fetch(`${api}/place_order`, {
            credentials: 'include'
        })
    }
}