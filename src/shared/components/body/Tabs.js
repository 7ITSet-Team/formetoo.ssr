import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import {Link} from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

import styles from '@styles/body/Tabs'

export default withStyles(styles)(({classes, tab, tabs, isOpen, changeTab, onOpen, onClose}) => (
    <Paper
        className={classes.paper}
    >
        <Tabs
            value={tab.index}
            onChange={changeTab}
            indicatorColor='secondary'
            textColor='secondary'
            scrollButtons='auto'
            scrollable={window.deviceWidth < 750}
            centered={window.deviceWidth >= 750 || !__isBrowser__}
            className={classes.tabs}
        >
            {tabs.map((tab, index) => {
                if (tab.slug === 'catalog') {
                    // При нажатии на таб "Каталог" рендер выпадающего меню
                    return (
                        <Tab
                            component={props => (
                                <div
                                    className={`${props.className} ${classes.selectTab}`}
                                    onMouseUp={onOpen}
                                >
                                    Каталог
                                    <Select
                                        open={isOpen}
                                        value=''
                                        onOpen={onOpen}
                                        onClose={onClose}
                                        className={classes.select}
                                    >

                                        <Link
                                            to='/catalog'
                                            className={classes.link}
                                        >
                                            <MenuItem
                                                onClick={props.onClick /*Событие для плавного перемещения маленькой полоски внизу таба*/}
                                            >
                                                Категории
                                            </MenuItem>
                                        </Link>
                                    </Select>
                                </div>
                            )}
                            key={index}
                        />
                    )
                }
                return (
                    <Tab
                        label={tab.label}
                        className={classes.tab}
                        component={Link}
                        to={`/${tab.slug}`}
                        key={index}
                    />
                )
            })}
        </Tabs>
    </Paper>
))