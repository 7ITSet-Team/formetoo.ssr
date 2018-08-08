import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import {Header, Body, Footer} from '@components'
import styles from '@styles/Layout'

export default withStyles(styles)(({classes}) => (
    <div
        className={classes.layout}
    >
        <CssBaseline />
        <Header/>
        <Body/>
        <Footer/>
    </div>
))