import React, {Fragment} from 'react'
import {withStyles} from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import {Link} from 'react-router-dom'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'

import styles from '@styles/body/From-Set-Products'

export default withStyles(styles)(({classes, data}) => (
    <Fragment>
        <span>
            Продукты из набора:
        </span>
        <GridList
            className={classes.gridList}
            cols={
                deviceWidth < 713
                    ? 1
                    : deviceWidth < 1040
                    ? 2
                    : deviceWidth < 1323
                        ? 3
                        : 4
            }
        >
            {data.fromSet.map((product, index) => (
                <Link
                    to={`/catalog/products/${product.slug}`}
                    className={classes.link}
                    key={index}
                >
                    <GridListTile
                        className={classes.gridListTile}
                    >
                        <img
                            src={product.images[0]}
                            className={classes.addImageProduct}
                        />
                        <GridListTileBar
                            title={product.title}
                        />
                    </GridListTile>
                </Link>
            ))}
        </GridList>
    </Fragment>
))