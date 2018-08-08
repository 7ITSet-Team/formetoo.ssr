import React from 'react'
import {withStyles} from '@material-ui/core/styles'

import {Logo, SearchBar} from '@components'
import {Cart} from '@containers'
import styles from '@styles/header/header-middle/Header-Middle'

export default withStyles(styles)(({classes}) => (
    <div
        className={classes.grid}
    >
        <div>
            <Logo/>
        </div>
        <div className={classes.searchBar}>
            <SearchBar/>
        </div>
        <div>
            <Cart/>
        </div>
    </div>
))