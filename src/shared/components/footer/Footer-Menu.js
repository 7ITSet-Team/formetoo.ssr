import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import {Link} from 'react-router-dom'

import styles from '@styles/footer/Footer-Menu'

export default withStyles(styles)(({classes, title, menuItems}) => (
    <div
        className={classes.column}
    >
        <div
            className={classes.title}
        >
            {title}
        </div>
        {
            menuItems.map((menuItem, index) => (
                <Link
                    to={menuItem.url}
                    className={classes.link}
                    key={index}
                >
                    {menuItem.label}
                </Link>
            ))
        }
    </div>
))