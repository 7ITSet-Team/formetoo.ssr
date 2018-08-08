import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import CartIcon from '@material-ui/icons/ShoppingCart'
import {Link, withRouter} from 'react-router-dom'

import styles from '@styles/body/Cards'

export default withRouter(withStyles(styles)(({classes, data, match}) => (
        <div
            className={classes.root}
        >
            {data.map((item, index) => {
                return (
                    <Card
                        className={classes.card}
                        key={index}
                    >
                        <CardMedia
                            className={classes.media}
                            image={item.image || item.images[0]}
                        />
                        <CardContent>
                        <span
                            className={classes.title}
                        >
                            {item.title}
                        </span>
                        </CardContent>
                        <CardActions>
                            <Link
                                to={match.url === '/catalog' ? `${match.url}/${item.slug}` : `/catalog/products/${item.slug}`}
                                className={classes.link}
                            >
                                <Button
                                    size='large'
                                    className={classes.button}
                                >
                                    <CartIcon/>
                                    <span>
                                    {match.url === '/catalog'
                                        ? 'Продукты'
                                        : 'Подробнее'}
                                </span>
                                </Button>
                            </Link>
                        </CardActions>
                    </Card>
                )
            })}
        </div>
    )
))