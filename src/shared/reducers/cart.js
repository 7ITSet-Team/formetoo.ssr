import {PUT_CART_INFORMATION, PUT_CART_PRODUCTS} from '@constants/actions'

const initialState = {
    cartInformation: {
        success: undefined,
        data: {}
    },
    cartProducts: {
        success: undefined,
        data: []
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case PUT_CART_INFORMATION:
            return {
                ...state,
                cartInformation: action.payload
            }
        case PUT_CART_PRODUCTS:
            return {
                ...state,
                cartProducts: action.payload
            }
        default :
            return state
    }
}