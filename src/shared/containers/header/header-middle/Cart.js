import React, {Component} from 'react'
import {connect} from 'react-redux'

import {Cart} from '@components'

class CartContainer extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Cart
                info={this.props.cartState.cartInformation.data}
            />
        )
    }
}

export default connect(
    store => ({
        cartState: store.cart
    })
)(CartContainer)