import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import {checkAuthenticated} from '@actions/auth'
import {getCartInformation} from '@actions/cart'
import Layout from '@components'

class LayoutContainer extends PureComponent {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.checkAuthenticated() // Проверяем, авторизован ли пользователь
        this.props.getCartInformation() // Получаем информацию о корзине
    }

    render() {
        return (
            <Layout/>
        )
    }
}

export default connect(
    undefined,
    dispatch => ({
        checkAuthenticated: () => dispatch(checkAuthenticated()),
        getCartInformation: () => dispatch(getCartInformation())
    }),
    undefined,
    {
        pure: false // Не использовать PureComponent (для обновления маршрута в Body)
    }
)(withRouter(LayoutContainer))