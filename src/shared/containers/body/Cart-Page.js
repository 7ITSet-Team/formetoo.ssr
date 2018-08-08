import React, {PureComponent} from 'react'
import Cookies from 'js-cookie'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'

import {CartPage} from '@components'
import {getCartProducts, getCartInformation} from '@actions/cart'
import cartService from '@common/services/api/cart'

class CartPageContainer extends PureComponent {
    constructor(props) {
        super(props)
    }

    state = {
        dialog: {
            isOpen: false  // Всплывающее окно, появляющееся после нажатия кнопки "Оформить заказ"
        },
        redirect: {
            success: false,
            to: undefined
        }
    }

    componentDidMount() {
        this.props.getCartProducts()
    }

    changeCount = (id, count) => {
        const numberReg = /^\d+$/
        const isNumber = numberReg.test(count)
        if (isNumber || ' ') {
            let currentCart = JSON.parse(Cookies.get('cart') || '[]')
            let isExist = false
            let i = 0
            for (i; i < currentCart.length; i++) {
                if (currentCart[i].id === id) {
                    isExist = true
                    break
                }
            }
            if (!isExist) {
                currentCart.push({id, count: count < 0 ? 0 : count})
            } else {
                currentCart[i] = {
                    id,
                    count: count < 0 ? 0 : count
                }
            }
            Cookies.set('cart', currentCart)
            this.props.getCartProducts() // Получаем обновлённый массив продуктов
            this.props.getCartInformation() // Обновляем информацию о корзине
        }
    }

    handleCloseDialog = () => {
        this.setState({
            dialog: {
                isOpen: false
            }
        })
    }

    // Оформление заказа
    placeOrder = () => {
        if (!this.props.authStore.isAuthenticated) {
            // Если пользователь не авторизован перенаправляем на страницу логина
            return this.setState({
                redirect: {
                    success: true,
                    to: '/login'
                }
            })
        }
        cartService.placeOrder()
            .then(response => console.log(response))
        this.setState({
            dialog: {
                isOpen: true
            }
        })
    }

    removeProduct = id => {
        const currentCart = JSON.parse(Cookies.get('cart') || '[]')
        let newCart = []
        for (let i = 0; i < currentCart.length; i++) {
            if (currentCart[i].id !== id) {
                newCart.push(currentCart[i])
            }
        }
        Cookies.set('cart', newCart)
        this.props.getCartProducts() // Получаем обновлённый массив продуктов
        this.props.getCartInformation() // Обновляем информацию о корзине
    }

    render() {
        if (this.state.redirect.success) {
            return (
                <Redirect to={this.state.redirect.to}/>
            )
        }
        if (!this.props.cartState.cartProducts.success) {
            return (
                <CircularProgress/>
            )
        }
        return (
            <CartPage
                products={this.props.cartState.cartProducts.data}
                isOpen={this.state.dialog.isOpen}
                removeProduct={id => this.removeProduct(id)}
                placeOrder={this.placeOrder}
                handleCloseDialog={this.handleCloseDialog}
                changeCount={(id, count) => this.changeCount(id, count)}
            />
        )
    }
}

export default connect(
    store => ({
        cartState: store.cart,
        authStore: store.auth
    }),
    dispatch => ({
        getCartProducts: () => dispatch(getCartProducts()),
        getCartInformation: () => dispatch(getCartInformation())
    })
)(CartPageContainer)