import {HANDLE_AUTHENTICATE_RESULT, SET_AUTHENTICATED, HANDLE_REGISTRATION_RESULT} from '@constants/actions'

const initialState = {
    isAuthenticated: undefined,
    isRegistered: undefined,
    authenticateResult: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                isAuthenticated: action.payload
            }
        case HANDLE_AUTHENTICATE_RESULT:
            if (action.payload.success)
                return {
                    ...state,
                    isAuthenticated: true
                }
            else
                return {
                    ...state,
                    isAuthenticated: false,
                    authenticateResult: action.payload
                }
        case HANDLE_REGISTRATION_RESULT:
            if (action.payload.success)
                return {
                    ...state,
                    isRegistered: true
                }
            else
                return {
                    ...state,
                    isRegistered: false
                }
    }
    return state
}