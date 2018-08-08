import React, {Fragment} from 'react'
import {withStyles} from '@material-ui/core/styles'

import styles from '@styles/header/header-top/City'

export default withStyles(styles)(({classes}) => (
    <Fragment>
        Ваш город: <span className={classes.town}>Москва</span>
    </Fragment>
))