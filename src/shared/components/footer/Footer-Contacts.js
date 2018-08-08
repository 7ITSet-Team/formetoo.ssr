import React from 'react'
import {withStyles} from '@material-ui/core/styles'

import styles from '@styles/footer/Footer-Contacts'

export default withStyles(styles)(({classes}) => (
    <div
        className={classes.column}
    >
        <span
            className={classes.title}
        >
            Контакты
        </span>
        <span
            className={classes.info}
        >
            127000, Москва, ул.Ленинградская,
        </span>
        <span
            className={classes.info}
        >
            д.157, этаж 3, оф.378
        </span>
        <span
            className={classes.info}
        >
            +7 (495)378-92-96
        </span>
    </div>
))