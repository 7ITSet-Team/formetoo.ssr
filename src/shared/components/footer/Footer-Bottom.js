import React from 'react'
import {withStyles} from '@material-ui/core/styles'

import {Copyright} from '@components'
import styles from '@styles/footer/Footer-Bottom'

export default withStyles(styles)(({classes}) => (
    <div
        className={classes.footerBottom}
    >
        <Copyright/>
    </div>
))