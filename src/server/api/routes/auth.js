import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {ObjectID} from 'mongodb'
import nodemailer from 'nodemailer'

import api from '@constants/api'

export default (app, db) => {
    app.post('/api/login', async (req, res, next) => {
        try {
            const {password} = req.body
            const user = await db.collection('users').findOne({email: req.body.email.toLowerCase()})
            if (!user) {
                return res.status(401).send({
                    success: false,
                    msg: 'Неправильный логин или пароль'
                })
            }
            if (!user.isActive) {
                return res.status(401).send({
                    success: false,
                    msg: 'Активируйте аккаунт. Ссылка для активации отправлена Вам на почту.'
                })
            }
            const isChecked = await bcrypt.compare(password, user.password)
            if (isChecked) {
                const secret = 'SYW/:ZIFrxd\')ueR#<Oj,ABzutT]QI({%MekfS9(l|7NM-&m6RTgP@)X44sOGVE'
                const token = jwt.sign({id: user._id}, secret)
                res.cookie('JWT', token, {
                    maxAge: 1000 * 60 * 60 * 24 * 30, // Жизнь куки - 30 дней
                    httpOnly: true
                }).send({
                    success: true
                })
            } else {
                res.status(401).send({
                    success: false,
                    msg: 'Неправильный логин или пароль'
                })
            }
        } catch (e) {
            res.status(401).send({
                success: false,
                msg: 'Ошибка при авторизации. Повторите попытку позднее.'
            })
        }
        next()
    })

    app.post('/api/register', async (req, res, next) => {
        const {password, email} = req.body
        try {
            const user = await db.collection('users').findOne({email})
            if (!user) {
                const salt = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash(password, salt)
                const role = await db.collection('roles').findOne({default: true}) // Находим роль, которая используется по дефолту
                if (!role) {
                    return res.status(401).send({
                        success: false,
                        msg: 'Извините, регистрация временно не доступна'
                    })
                }
                const user = await db.collection('users').insertOne({...req.body, password: hashedPassword, role: role.slug, isActive: false})

                // NODEMAILER конфигурация
                const transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    auth: {
                        user: 'formetood@gmail.com',
                        pass: 'topotop123'
                    }
                })
                const activateLink = `${api}/signup-complete/${user.insertedId}`
                const mailOptions = {
                    from: 'ttestovyjndemailer@gmail.com',
                    to: email,
                    subject: 'Активация аккаунта',
                    html: `
                        <p>
                            Здравствуйте! Спасибо за вашу регистрацию на сайте http://formetoo.ru! Чтобы активировать аккаунт, нажмите на кнопку ниже: 
                        </p>
                        <p>
                            <a
                                href=${activateLink}
                            >
                                Завершить регистрацию
                            </a>
                        </p>
                    `
                }
                transporter.sendMail(mailOptions, err => {
                    if (err) {
                        throw err
                    }
                })

                res.send({
                    success: true
                })
            } else {
                res.status(401).send({
                    success: false,
                    msg: 'Ошибка при регистрации. Пользователь с такой почтой уже занят.'
                })
            }
        } catch (e) {
            res.status(401).send({
                success: false,
                msg: 'Ошибка при регистрации. Повторите попытку позднее.'
            })
        }
        next()
    })

    app.get('/api/verify', async (req, res, next) => {
        const jwtCookie = req.cookies.JWT
        if (!jwtCookie) {
            return res.send({
                success: false
            })
        }
        const secret = 'SYW/:ZIFrxd\')ueR#<Oj,ABzutT]QI({%MekfS9(l|7NM-&m6RTgP@)X44sOGVE'
        const payload = jwt.verify(jwtCookie, secret)
        const user = await db.collection('users').findOne({_id: ObjectID(payload.id)})
        if (!user) {
            return res.clearCookie('JWT').send({
                success: false
            })
        }
        delete user._id
        delete user.password
        res.send({
            success: true,
            profile: user
        })
        next()
    })

    app.get('/api/logout', (req, res, next) => {
        res.clearCookie('JWT').send({
            success: true
        })
    })

    app.get('/api/signup-complete/:id', async (req, res, next) => {
        const id = req.params.id
        try {
            await db.collection('users').update({_id: ObjectID(id)}, {$set: {isActive: true}})
            const secret = 'SYW/:ZIFrxd\')ueR#<Oj,ABzutT]QI({%MekfS9(l|7NM-&m6RTgP@)X44sOGVE'
            const token = jwt.sign({id}, secret)
            res.cookie('JWT', token, {
                maxAge: 1000 * 60 * 60 * 24 * 30, // Жизнь куки - 30 дней
                httpOnly: true
            }).redirect('/homepage')
        } catch (e) {
            res.status(401).send({
                success: false,
                msg: 'Ошибка при активации. Повторите попытку позднее.'
            })
        }
    })
}
