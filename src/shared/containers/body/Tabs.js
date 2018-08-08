import React, {PureComponent} from 'react'
import {withRouter} from 'react-router-dom'

import {Tabs} from '@components'

class TabsContainer extends PureComponent {
    constructor(props) {
        super(props)

        const currentResource = this.props.location.pathname.slice(1)
        switch (currentResource) {
            case 'homepage':
                this.tab.index = 0
                this.tab.slug = currentResource
                break
            case 'catalog':
                this.tab.index = 1
                this.tab.slug = currentResource
                break
            case 'promotion':
                this.tab.index = 2
                this.tab.slug = currentResource
                break
            case 'delivery':
                this.tab.index = 3
                this.tab.slug = currentResource
                break
            case 'about':
                this.tab.index = 4
                this.tab.slug = currentResource
                break
            case 'contacts':
                this.tab.index = 5
                this.tab.slug = currentResource
                break
            default:
                this.tab.index = false
                this.tab.slug = undefined
        }
    }

    tab = {
        cleared: false
    }

    state = {
        tab: this.tab,
        tabs: [{
            label: 'Главная',
            slug: 'homepage'
        }, {
            label: 'Каталог',
            slug: 'catalog'
        }, {
            label: 'Акции',
            slug: 'promotion'
        }, {
            label: 'Доставка и оплата',
            slug: 'delivery'
        }, {
            label: 'О компании',
            slug: 'about'
        }, {
            label: 'Контакты',
            slug: 'contacts'
        }],
        isOpen: false
    }

    changeTab = (event, index) => {
        this.setState({
            tab: {
                index,
                slug: this.state.tabs[index].slug,
                cleared: false
            }
        })
    }

    handleOpen = () => {
        this.setState({
            isOpen: true
        })
    }

    handleClose = () => {
        this.setState({
            isOpen: false
        })
    }

    render() {
        return (
            <Tabs
                changeTab={this.changeTab}
                onOpen={this.handleOpen}
                onClose={this.handleClose}
                {...this.state /*Передаём данные о табах*/}
                {...this.props /*Передаем данные о маршруте*/}
            />
        )
    }
}

export default withRouter(TabsContainer)