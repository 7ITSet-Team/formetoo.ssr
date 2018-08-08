import api from '@constants/api'

export default class {
    static getResource = resource => {
        return fetch(`${api}/${resource}`)
    }
}