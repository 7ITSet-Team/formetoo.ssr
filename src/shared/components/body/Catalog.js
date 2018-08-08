import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

import {Cards} from '@components'
import styles from '@styles/body/Catalog'
import withData from '@hocs/withData'

export default withData(withStyles(styles)(({classes, data}) => (
        <Paper
            className={classes.paper}
        >
            <Cards
                data={data}
            />
        </Paper>
    )
))