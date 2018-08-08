import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CartIcon from '@material-ui/icons/ShoppingCart'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import {Link} from 'react-router-dom'

import styles from '@styles/body/Attributes'

export default withStyles(styles)(({classes, data, addToCart, closeDialog, count, changeCount, isOpen, getCartInfo}) => (
    <div
        className={classes.attributesLayout}
    >
        <div
            className={classes.attributes}
        >
            {data.attributes.map((attribute, index) => {
                if (typeof attribute.value === 'boolean') {
                    if (attribute.value) {
                        attribute.value = 'Да'
                    } else {
                        attribute.value = 'Нет'
                    }
                }
                return (
                    <div
                        className={classes.attribute}
                        key={index}
                    >
                        <span
                            className={classes.attributeTitle}
                        >
                            {attribute.title}:
                        </span>
                        <span>
                            {attribute.value} {attribute.unit}
                        </span>
                    </div>
                )
            })}
        </div>
        <div
            className={classes.actions}
        >
            <TextField
                label='Количество'
                value={count}
                name='count'
                onChange={changeCount}
                type='number'
                InputLabelProps={{
                    shrink: true
                }}
                margin='normal'
            />
            <Button
                variant='contained'
                color='primary'
                size='large'
                onClick={() => addToCart(data._id, count)}
            >
                <CartIcon
                    className={classes.cartIcon}
                />
                <span
                    className={classes.buttonTitle}
                >
                    {data.price}₽
                </span>
            </Button>
        </div>
        <Dialog
            open={isOpen}
            onClose={closeDialog}
        >
            <DialogTitle>
                Товар успешно добавлен в корзину!
            </DialogTitle>
            <DialogActions>
                <Link
                    to='/cart'
                    className={classes.link}
                >
                    <Button
                        onClick={getCartInfo}
                        className={classes.cartButton}
                    >
                        Корзина
                    </Button>
                </Link>
                <Button
                    onClick={closeDialog}
                    color='primary'
                >
                    Закрыть
                </Button>
            </DialogActions>
        </Dialog>
    </div>
))