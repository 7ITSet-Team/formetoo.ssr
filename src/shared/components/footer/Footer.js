import React from 'react'
import {withStyles} from '@material-ui/core/styles'

import {FooterBottom, FooterTop} from '@components'

import styles from '@styles/footer/Footer'

export default withStyles(styles)(({classes}) => (
    <div
        className={classes.footer}
    >
        <FooterTop/>
        <FooterBottom/>
    </div>
))