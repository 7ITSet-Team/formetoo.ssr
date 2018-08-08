import {combineReducers} from 'redux'

import auth from '@reducers/auth'
import resources from '@reducers/resources'
import cart from '@reducers/cart'

export default combineReducers({
    auth,
    resources,
    cart
})