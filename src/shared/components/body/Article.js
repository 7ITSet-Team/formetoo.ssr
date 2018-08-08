import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

import styles from '@styles/body/Articles'
import withData from '@hocs/withData'

export default withData(withStyles(styles)(({classes, data}) => (
        <Paper
            className={classes.paper}
        >
        <span
            className={classes.title}
        >
            {data.title}
        </span>
            <span
                className={classes.content}
                dangerouslySetInnerHTML={{__html: data.content}}
            />
        </Paper>
    )
))