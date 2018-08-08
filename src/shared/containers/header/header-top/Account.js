import React, {PureComponent} from 'react'
import {connect} from 'react-redux'

import {Account} from '@components'
import {logout} from '@actions/auth'

class AccountContainer extends PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Account
                handleLogout={this.props.logout}
                isAuthenticated={this.props.authStore.isAuthenticated}
            />
        )
    }
}

export default connect(
    store => ({
        authStore: store.auth
    }),
    dispatch => ({
        logout: () => dispatch(logout())
    })
)(AccountContainer)