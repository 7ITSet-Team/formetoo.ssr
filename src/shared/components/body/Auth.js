import React from 'react'
import Paper from '@material-ui/core/Paper'
import {withStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import styles from '@styles/body/Auth'

export default withStyles(styles)(({classes, match, validation, auth, handleChangeFormValue, handleValidation}) => (
    <Paper
        className={classes.root}
    >
        {match.url === '/register' ? 'Регистрация' : 'Вход'}
        {!validation.success || !auth.success
            ? (
                <span
                    className={classes.error}
                >
                    {auth.msg || validation.msg}
                </span>
            )
            : undefined}
        <TextField
            required
            label='Почта'
            className={classes.textField}
            type='email'
            name='email'
            onChange={handleChangeFormValue}
            margin='normal'
        />
        {match.url === '/register' ? [
            <TextField
                required
                label='Имя'
                className={classes.textField}
                name='name'
                onChange={handleChangeFormValue}
                margin='normal'
                key={1}
            />,
            <TextField
                required
                label='Фамилия'
                className={classes.textField}
                name='lastname'
                onChange={handleChangeFormValue}
                margin='normal'
                key={2}
            />,
            <TextField
                label='Телефон'
                className={classes.textField}
                name='phone'
                onChange={handleChangeFormValue}
                margin='normal'
                key={3}
            />
        ] : null}
        <TextField
            required
            label='Пароль'
            className={classes.textField}
            type='password'
            name='password'
            onChange={handleChangeFormValue}
            margin='normal'
        />
        {match.url === '/register' ? (
            <TextField
                required
                label='Подтверждение пароля'
                type='password'
                className={classes.textField}
                name='repeatPassword'
                onChange={handleChangeFormValue}
                margin='normal'
            />
        ) : null}
        <Button
            variant='outlined'
            color='primary'
            className={classes.button}
            onClick={handleValidation}
        >
            {match.url === '/register' ? 'Зарегистрироваться' : 'Войти'}
        </Button>
        {match.url === '/register'
            ? (
                <span
                    className={classes.addInfo}
                >
                    *После нажатия на кнопку "Зарегистрироваться", Вам на почту придёт ссылка на активацию аккаунта.
                </span>
            )
            : undefined}
    </Paper>
))