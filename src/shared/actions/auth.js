import authService from '@common/services/api/auth'
import {SET_AUTHENTICATED, HANDLE_AUTHENTICATE_RESULT, HANDLE_REGISTRATION_RESULT} from '@constants/actions'

const setAuthenticated = isAuthenticated => ({
    type: SET_AUTHENTICATED,
    payload: isAuthenticated
})

const handleAuthenticateResult = result => ({
    type: HANDLE_AUTHENTICATE_RESULT,
    payload: result
})

const handleRegistrationResult = result => ({
    type: HANDLE_REGISTRATION_RESULT,
    payload: result
})

const checkAuthenticated = () => {
    return dispatch => {
        return authService.isAuthenticated().then(
            response => {
                response.json().then(data => dispatch(setAuthenticated(data.success)))
            },
            error => {
                dispatch(setAuthenticated(false))
                throw error
            }
        )
    }
}

const authenticate = (action, user) => {
    return dispatch => {
        return authService.authenticate(action, user).then(
            response => response.json().then(data => {
                if (action === 'register') {
                    return dispatch(handleRegistrationResult(data))
                }
                dispatch(handleAuthenticateResult(data))
            }),
            error => {
                dispatch(handleAuthenticateResult({success: false}))
                throw error
            }
        )
    }
}

const logout = () => {
    return dispatch => {
        return authService.logout().then(
            response => response.json().then(data => dispatch(data.success ? setAuthenticated(!data.success) : undefined)),
            error => {
                throw error
            }
        )
    }
}

export {
    checkAuthenticated,
    authenticate,
    logout
}