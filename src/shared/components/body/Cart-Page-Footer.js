import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Radio from '@material-ui/core/Radio'
import Button from '@material-ui/core/Button/'

import styles from '@styles/body/Cart-Page-Footer'

export default withStyles(styles)(({classes, selectedValue, handleCheck, placeOrder, cartInfo}) => (
    <div
        className={classes.footer}
    >
        <Paper
            className={classes.card}
        >
            <span
                className={classes.cardTitle}
            >
                Выберите способ доставки
            </span>
            <div>
                <Radio
                    checked={selectedValue === 'a'}
                    onChange={handleCheck}
                    value='a'
                    name='radio-button-demo'
                    aria-label='A'
                    classes={{
                        root: classes.root,
                        checked: classes.checked,
                    }}
                />
                <span
                    className={classes.checkTitle}
                >
                    Самовывоз
                </span>
            </div>
            <div>
                <Radio
                    checked={selectedValue === 'b'}
                    onChange={handleCheck}
                    value='b'
                    name='radio-button-demo'
                    aria-label='B'
                    classes={{
                        root: classes.root,
                        checked: classes.checked,
                    }}
                />
                <span
                    className={classes.checkTitle}
                >
                    Доставка
                </span>
            </div>
        </Paper>
        <Paper
            className={classes.card}
        >
                <span
                    className={classes.cardTitle}
                >
                    Итого
                </span>
            <div
                className={classes.delimiter}
            />
            <div
                className={classes.info}
            >
                <span>
                    Товаров на:
                </span>
                <span>
                    {cartInfo.cartTotal}
                </span>
            </div>
            <div
                className={classes.info}
            >
                <span>
                    Доставка от
                </span>
                <span>
                    0₽
                </span>
            </div>
            <Button
                variant='contained'
                color='primary'
                className={classes.button}
                onClick={placeOrder}
            >
                ОФОРМИТЬ ЗАКАЗ
            </Button>
        </Paper>
    </div>
))