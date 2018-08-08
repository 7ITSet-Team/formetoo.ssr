import {PUT_RESOURCES} from '@constants/actions'
import resourcesService from '@common/services/api/resources'

const putResources = (resources, resource) => ({
    type: PUT_RESOURCES,
    payload: resources,
    resourceName: resource
})

const getResources = resource => {
    return dispatch => {
        return resourcesService.getResource(resource).then(
            response => response.json().then(data => dispatch(putResources(data, resource))),
            error => {
                dispatch(putResources({success: false, data: [], resourceName: resource}))
                throw error
            }
        )
    }
}

export {
    getResources
}