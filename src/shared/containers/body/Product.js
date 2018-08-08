import React, {PureComponent} from 'react'
import Cookies from 'js-cookie'
import {connect} from 'react-redux'

import {Product} from '@components'
import {getCartInformation} from '@actions/cart'

class ProductContainer extends PureComponent {
    constructor(props) {
        super(props)
    }

    state = {
        tab: 0,
        count: 1,
        isOpen: false
    }

    handleChangeTab = (event, value) => {
        this.setState({
            tab: value
        })
    }

    /**
     * id - айди добавляемого товара
     * count - количество товара
     */
    addToCart = (id, count) => {
        let currentCart = JSON.parse(Cookies.get('cart') || '[]')
        let isExist = false
        let i = 0
        // Проверяем, находится ли в куки такой товар
        for (i; i < currentCart.length; i++) {
            if (currentCart[i].id === id) {
                isExist = true
                break
            }
        }
        if (!isExist) {
            currentCart.push({id, count})
            Cookies.set('cart', currentCart)
        } else {
            // Каждый продукт в куки содержит в себе айдишник и количество
            currentCart[i] = {
                id,
                count: currentCart[i].count + count
            }
            Cookies.set('cart', currentCart)
        }
        this.props.getCartInformation()
        this.setState({
            isOpen: true
        })
    }

    changeCount = event => {
        event.target.value > 0 && this.setState({
            [event.target.name]: Number(event.target.value)
        })
    }

    closeDialog = () => {
        this.setState({
            isOpen: false
        })
    }

    render() {
        return (
            <Product
                handleChangeTab={this.handleChangeTab}
                addToCart={(id, count) => this.addToCart(id, count)}
                closeDialog={this.closeDialog}
                {...this.state}
                {...this.props}
            />
        )
    }
}

export default connect(
    undefined,
    dispatch => ({
        getCartInformation: () => dispatch(getCartInformation())
    })
)(ProductContainer)