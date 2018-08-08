import cartService from '@common/services/api/cart'
import {PUT_CART_INFORMATION, PUT_CART_PRODUCTS} from '@constants/actions'

const putCartInformation = info => ({
    type: PUT_CART_INFORMATION,
    payload: info
})

const putCartProducts = products => ({
    type: PUT_CART_PRODUCTS,
    payload: products
})

const getCartInformation = () => {
    return dispatch => {
        return cartService.getCartInfo().then(
            response => {
                response.json().then(data => dispatch(putCartInformation(data)))
            },
            error => {
                dispatch(putCartInformation({success: false, data: undefined}))
                throw error
            }
        )
    }
}

const getCartProducts = () => {
    return dispatch => {
        return cartService.getCartProducts().then(
            response => {
                response.json().then(data => dispatch(putCartProducts(data)))
            },
            error => {
                dispatch(putCartProducts({success: false, data: undefined}))
                throw error
            }
        )
    }
}

export {
    getCartInformation,
    getCartProducts
}