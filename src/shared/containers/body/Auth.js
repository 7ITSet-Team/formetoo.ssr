import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import {Auth} from '@components'
import authService from '@common/services/api/auth'
import {authenticate} from '@actions/auth'

class AuthContainer extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        form: {
            email: '',
            name: '',
            lastname: '',
            phone: '',
            password: '',
            repeatPassword: ''
        },
        validation: {
            success: true,
            msg: undefined
        }
    }

    validateEmail = email => {
        const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return emailReg.test(String(email).toLowerCase())
    }

    handleValidation = () => {
        const {match} = this.props
        const {email, name, lastname, password, repeatPassword} = this.state.form
        const isValidated = this.validateEmail(email)

        // Если введены все поля
        if (!isValidated || !email || !password || (match.url === '/register' && (!name || !lastname || !repeatPassword || (password !== repeatPassword)))) {
            if (password !== repeatPassword && match.url === '/register') {
                return this.setState({
                    validation: {
                        success: false,
                        msg: 'Ошибка подтверждения пароля: вы ввели разные пароли'
                    }
                })
            } else if (!this.validateEmail(email)) {
                return this.setState({
                    validation: {
                        success: false,
                        msg: 'Почта введена не правильно'
                    }
                })
            } else {
                return this.setState({
                    validation: {
                        success: false,
                        msg: 'Заполнены не все поля'
                    }
                })
            }
        }

        if (match.url === '/register') {
            let info = this.state.form
            delete info.repeatPassword
            this.props.authenticate('register', info)
        } else {
            this.props.authenticate('login', {email, password})
        }
    }

    handleChangeFormValue = event => {
        const {name, value} = event.target
        this.setState({
            form: {
                ...this.state.form,
                [name]: (name === 'password' || name === 'repeatPassword')
                    ? authService.getHash(value)
                    : value
            }
        })
    }

    render() {
        const {isAuthenticated, isRegistered, authenticateResult} = this.props.authState
        if (isRegistered && !isAuthenticated && this.props.match.url === '/register')
            return <Redirect to='/login'/>
        if (isAuthenticated && this.props.match.url === '/login')
            return <Redirect to='/homepage'/>
        return (
            <Auth
                auth={authenticateResult}
                handleValidation={this.handleValidation}
                validation={this.state.validation}
                handleChangeFormValue={this.handleChangeFormValue}
                match={this.props.match}
            />
        )
    }
}

export default connect(
    store => ({
        authState: store.auth
    }),
    dispatch => ({
        authenticate: (action, user) => dispatch(authenticate(action, user))
    })
)(AuthContainer)