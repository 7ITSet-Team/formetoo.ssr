import React, {Component} from 'react'
import {connect} from 'react-redux'

import {CartPageFooter} from '@components'

class CartPageFooterContainer extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        selectedValue: 'a'
    }

    handleCheck = event => {
        this.setState({
            selectedValue: event.target.value
        })
    }

    render() {
        return (
            <CartPageFooter
                handleCheck={this.handleCheck}
                selectedValue={this.state.selectedValue}
                placeOrder={this.props.placeOrder}
                cartInfo={this.props.cartState.cartInformation.data}
            />
        )
    }
}

export default connect(
    store => ({
        cartState: store.cart
    })
)(CartPageFooterContainer)