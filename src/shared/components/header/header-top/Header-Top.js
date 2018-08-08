import React from 'react'
import {withStyles} from '@material-ui/core/styles'

import {City, Address, Phone} from '@components'
import {Account} from '@containers'
import styles from '@styles/header/header-top/Header-Top'

export default withStyles(styles)(({classes}) => (
    <div
        className={classes.grid}
    >
        <div
            className={classes.item}
        >
            <City/>
        </div>
        <div
            className={classes.item}
        >
            <Address/>
        </div>
        <div
            className={classes.item}
        >
            <Phone/>
        </div>
        <div
            className={classes.item}
        >
            <Account/>
        </div>
    </div>
))