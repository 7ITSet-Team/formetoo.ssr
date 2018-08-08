import {PUT_RESOURCES} from '@constants/actions'

const initialState = {
    resources: {

    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case PUT_RESOURCES:
            return {
                ...state,
                resources: {
                    ...state.resources,
                    [action.resourceName]: action.payload
                }
            }
    }
    return state
}