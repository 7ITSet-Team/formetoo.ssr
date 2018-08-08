import React from 'react'

import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import ActionAndroid from '@material-ui/icons/YoutubeSearchedFor'
import {withStyles} from "@material-ui/core/styles"

import styles from '@styles/header/header-middle/Search-Bar'

export default withStyles(styles)(({classes}) => (
    <TextField
        placeholder='Поиск'
        InputProps={{
            endAdornment: (
                <IconButton
                    color='primary'
                >
                    <ActionAndroid/>
                </IconButton>
            )
        }}
        margin='normal'
        className={classes.searchBar}
        fullWidth
    />
))