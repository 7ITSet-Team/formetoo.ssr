import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'

import styles from '@styles/header/header-middle/Logo'

export default withStyles(styles)(({classes}) => (
    <Fragment>
        <div>
            <Link
                className={classes.link}
                to='/homepage'
            >
                <span
                    className={classes.accent}
                >
                    For
                </span>
                Me
                <span
                    className={classes.subaccent}
                >
                    Too
                </span>
            </Link>
        </div>
        <span
            className={classes.subtitle}
        >
            Интернет-магазин
        </span>
    </Fragment>
))