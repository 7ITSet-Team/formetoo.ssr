import React from 'react'
import {withStyles} from '@material-ui/core/styles'

import {FooterContacts, FooterMenu} from '@components'

import styles from '@styles/footer/Footer-Top'

export default withStyles(styles)(({classes}) => {
    const companyMenu = {
        title: 'Компания',
        menuItems: [
            {
                label: 'О компании',
                url: '/about'
            },
            {
                label: 'Новости',
                url: '/news'
            },
            {
                label: 'Вакансии',
                url: '/jobs'
            }
        ]
    }

    const infoMenu = {
        title: 'Информация',
        menuItems: [
            {
                label: 'Помощь',
                url: '/help'
            },
            {
                label: 'Олата и доставка',
                url: '/info'
            },
            {
                label: 'Гарантия на товар',
                url: '/warranty'
            }
        ]
    }

    const helpMenu = {
        title: 'Помощь',
        menuItems: [
            {
                label: 'Блог',
                url: '/blog'
            },
            {
                label: 'Вопрос-ответ',
                url: '/faq'
            },
            {
                label: 'Бренды',
                url: '/brands'
            }
        ]
    }
    return (
        <div
            className={classes.footer}
        >
            <FooterMenu
                {...companyMenu}
            />
            <FooterMenu
                {...infoMenu}
            />
            <FooterMenu
                {...helpMenu}
            />
            <FooterContacts/>
        </div>
    )
})