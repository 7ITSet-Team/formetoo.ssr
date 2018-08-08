import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import styles from '@styles/body/Product'
import withData from '@hocs/withData'
import {Attributes, RelatedProducts, FromSetProducts} from '@components'

export default withData(withStyles(styles)(({classes, data, handleChangeTab, tab, addToCart, closeDialog, changeCount, isOpen, count}) => (
    <Paper
        className={classes.root}
    >
        <div
            className={classes.header}
        >
            {data.title}
        </div>
        <div
            className={classes.paper}
        >
            <div
                className={classes.media}
            >
                <img
                    src={data.images[0]}
                    className={classes.photo}
                />
            </div>
            <Attributes
                data={data}
                addToCart={addToCart}
                closeDialog={closeDialog}
                count={count}
                changeCount={changeCount}
                isOpen={isOpen}
            />
            <Tabs
                value={tab}
                onChange={handleChangeTab}
                scrollable={deviceWidth < 750}
                centered={deviceWidth >= 750 || !__isBrowser__}
                className={classes.tabs}
            >
                {data.tabs.map((tab, index) => (
                    <Tab
                        label={tab.title}
                        key={index}
                    />
                ))}
            </Tabs>
            {data.tabs.map((item, index) => (
                tab === index
                && (
                    <span
                        className={classes.tab}
                        key={index}
                    >
                        {item.value}
                    </span>
                )
            ))}
        </div>
        <RelatedProducts
            data={data}
        />
        <FromSetProducts
            data={data}
        />
    </Paper>
)))