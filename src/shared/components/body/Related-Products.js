import React, {Fragment} from 'react'
import GridList from '@material-ui/core/GridList'
import {Link} from 'react-router-dom'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import {withStyles} from '@material-ui/core/styles'

import styles from '@styles/body/Related-Products'

export default withStyles(styles)(({classes, data}) => (
    <Fragment>
        <span>
            Похожие продукты:
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
            {data.relatedProducts.map((product, index) => (
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