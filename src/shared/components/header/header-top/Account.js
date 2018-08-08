import React from 'react'
import {Link} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'

import styles from '@styles/header/header-top/Account'

export default withStyles(styles)(({classes, handleLogout, isAuthenticated}) => (
        <div>
            {isAuthenticated
                ? (
                    <span>
                        Вы авторизованы! Страница профиля в разработке.
                    </span>
                )
                : (
                    <Link
                        to='/register'
                        className={classes.link}
                    >
                        Регистрация
                    </Link>
                )}
            <span
                className={classes.delimiter}
            >
                |
            </span>
            {isAuthenticated
                ? (
                    <span
                        className={classes.logout}
                        onClick={handleLogout}
                    >
                        Выйти
                    </span>
                )
                : (
                    <Link
                        to='/login'
                        className={classes.link}
                    >
                        Вход
                    </Link>
                )}
        </div>
    )
)