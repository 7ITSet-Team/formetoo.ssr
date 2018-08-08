import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'

import {getResources} from '@actions/resources'

const withDataHOC = WrappedComponent => {
    class withDataContainer extends PureComponent {
        constructor(props) {
            super(props)
        }

        componentDidMount() {
            const resource = this.props.match.url.slice(1)
            if (!this.props.resourcesState.resources[resource] || resource !== this.props.resourcesState.resources[resource].data.slug) { // Если в хранилище нет текущего ресурса - получаем
                this.props.getResource(resource)
            }
        }

        render() {
            const resource = this.props.match.url.slice(1)
            if (!this.props.resourcesState.resources[resource]) {
                return <CircularProgress size={50} />
            }
            return (
                <WrappedComponent
                    {...this.props}
                    data={this.props.resourcesState.resources[resource].data}
                />
            )
        }
    }

    return connect(
        store => ({
            resourcesState: store.resources
        }),
        dispatch => ({
            getResource: resource => dispatch(getResources(resource))
        })
    )(withDataContainer)
}

export default withDataHOC