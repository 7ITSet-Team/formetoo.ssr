import React, {Fragment} from 'react'
import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import {Link} from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import DeleteIcon from '@material-ui/icons/Delete'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import {CartPageFooter} from '@containers'
import styles from '@styles/body/Cart-Page'

export default withStyles(styles)(({products, classes, changeCount, removeProduct, placeOrder, isOpen, handleCloseDialog}) => (
        <div
            className={classes.cartGrid}
        >
            {products.length === 0
                ? (
                    <Fragment>
                        <span
                            className={classes.title}
                        >
                            Извините, но Ваша корзина пуста.
                        </span>
                        <Link
                            to='/catalog'
                            className={classes.link}
                        >
                            <Button
                                variant='outlined'
                                color='primary'
                            >
                                Отправиться за покупками
                            </Button>
                        </Link>
                    </Fragment>
                )
                : (
                    <Paper
                        className={classes.paper}
                    >
                        <div
                            className={classes.column}
                        >
                            <div
                                className={classes.columnItem}
                            >
                                Товар
                            </div>
                            <div/>
                            <div/>
                            <div
                                className={classes.columnItem}
                            >
                                Цена
                            </div>
                            <div
                                className={classes.columnItem}
                            >
                                Количество
                            </div>
                            <div
                                className={classes.columnItem}
                            >
                                Сумма
                            </div>
                        </div>
                        {products.map((product, index) => {
                            return (
                                <Paper
                                    className={`${classes.product} ${classes.column}`}
                                    key={index}
                                >
                                    <div
                                        className={classes.mainInfo}
                                    >
                                        <img
                                            src={product.images[0]}
                                            className={classes.image}
                                        />
                                        <div
                                            className={classes.info}
                                        >
                                            <span>
                                                {product.title}
                                            </span>
                                            <Button
                                                size='small'
                                                className={classes.deleteButton}
                                                onClick={() => removeProduct(product._id)}
                                            >
                                                Удалить
                                                <DeleteIcon/>
                                            </Button>
                                        </div>
                                    </div>
                                    <div/>
                                    <div/>
                                    <div>
                                        <span>
                                            {product.price}₽
                                        </span>
                                    </div>
                                    <div
                                        className={classes.count}
                                    >
                                        <div
                                            onClick={() => changeCount(product._id, Number(product.count) - 1)}
                                            className={classes.adjust}
                                        >
                                            -
                                        </div>
                                        <TextField
                                            label='Количество'
                                            value={product.count}
                                            name='count'
                                            onChange={event => changeCount(product._id, Number(event.target.value))}
                                            margin='normal'
                                            className={classes.textField}
                                        />
                                        <div
                                            onClick={() => changeCount(product._id, Number(product.count) + 1)}
                                            className={classes.adjust}
                                        >
                                            +
                                        </div>
                                    </div>
                                    <div
                                        className={classes.otherInfo}
                                    >
                                        <span>
                                            {Number(product.price) * Number(product.count)}₽
                                        </span>
                                    </div>
                                </Paper>
                            )
                        })}
                        <CartPageFooter
                            placeOrder={placeOrder}
                        />
                    </Paper>
                )}
            <Dialog
                open={isOpen}
                onClose={handleCloseDialog}
            >
                <DialogTitle>
                    Спасибо! Ваш заказ успешно оформлен.
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Спасибо! Ваш заказ успешно оформлен и сейчас обрабатывается! Вся дополнительная информация выслана
                        Вам на почту.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Link
                        to='/homepage'
                        className={classes.link}
                    >
                        <Button
                            onClick={handleCloseDialog}
                            color='primary'
                        >
                            На главную
                        </Button>
                    </Link>
                    <Link
                        to='/catalog'
                        className={classes.link}
                    >
                        <Button
                            onClick={handleCloseDialog}
                            color='primary'
                        >
                            В каталог
                        </Button>
                    </Link>
                </DialogActions>
            </Dialog>
        </div>
    )
)