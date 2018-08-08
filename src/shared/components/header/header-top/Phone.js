import React from 'react'
import {withStyles} from '@material-ui/core/styles'

import styles from '@styles/header/header-top/Phone'

export default withStyles(styles)(({classes}) => (
    <div>
        +7-(495)-
        <span
            className={classes.phone}
        >
            378-92-96
        </span>
    </div>
))