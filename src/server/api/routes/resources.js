import {ObjectID} from 'mongodb'
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

export default (app, db) => {
    const articles = ['homepage', 'promotion', 'delivery', 'about', 'contacts']
    const categoriesCol = db.collection('categories')
    const productsCol = db.collection('products')
    const articlesCol = db.collection('articles')

    app.get('/api/catalog', async (req, res, next) => {
        try {
            const resources = await categoriesCol.find({title: {$ne: 'Корневая'}}).toArray()
            res.send({
                success: true,
                data: resources
            })
            next()
        } catch (e) {
            res.status(500).send({
                success: false,
                msg: 'Ошибка сервера. Повторите попытку позже.',
                error: e
            })
        }
    })

    app.get('/api/catalog/:categorySlug', async (req, res, next) => {
        const slug = req.params.categorySlug
        try {
            const resources = await productsCol.find({categories: {$elemMatch: {$eq: slug}}}).toArray()
            res.send({
                success: true,
                data: resources
            })
        } catch (e) {
            res.status(500).send({
                success: false,
                msg: 'Ошибка сервера. Повторите попытку позже.',
                error: e
            })
        }
    })

    app.get('/api/catalog/products/:productSlug', async (req, res, next) => {
        const {productSlug} = req.params
        try {
            const product = await productsCol.findOne({slug: productSlug})
            const relatedProducts = await productsCol.find({slug: {$in: product.relatedProducts}}).toArray()
            const fromSet = await productsCol.find({slug: {$in: product.fromSet}}).toArray()
            product.relatedProducts = relatedProducts
            product.fromSet = fromSet
            res.send({
                success: true,
                data: product
            })
        } catch (e) {
            res.status(500).send({
                success: false,
                msg: 'Ошибка сервера. Повторите попытку позже.',
                error: e
            })
        }
    })

    app.get('/api/cart', async (req, res) => {
        const cartProducts = JSON.parse(req.cookies.cart)
        const ids = cartProducts.map(product => ObjectID(product.id))
        try {
            const products = await productsCol.find({_id: {$in: ids}}).toArray()
            let cartList = []
            for (let i = 0; i < products.length; i++) {
                for (let k = 0; k < cartProducts.length; k++) {
                    if (products[i]._id.toString() === cartProducts[k].id.toString()) {
                        cartList.push({
                            ...products[i],
                            count: cartProducts[k].count
                        })
                    }
                }
            }
            res.send({
                success: true,
                data: cartList
            })
        } catch (e) {
            res.status(500).send({
                success: false,
                msg: 'Ошибка сервера. Повторите попытку позже.',
                error: e
            })
        }
    })

    app.get('/api/cart/info', async (req, res) => {
        const cartProducts = JSON.parse(req.cookies.cart)
        const ids = cartProducts.map(product => ObjectID(product.id))
        try {
            const products = await productsCol.find({_id: {$in: ids}}).toArray()
            let cartTotal = 0
            let cartCount = 0
            for (let i = 0; i < products.length; i++) {
                for (let k = 0; k < cartProducts.length; k++) {
                    if (products[i]._id.toString() === cartProducts[k].id.toString()) {
                        cartTotal = cartTotal + Number(cartProducts[k].count) * Number(products[i].price)
                        cartCount = cartCount + Number(cartProducts[k].count)
                    }
                }
            }
            res.send({
                success: true,
                data: {cartTotal, cartCount}
            })
        } catch (e) {
            res.status(500).send({
                success: false,
                msg: 'Ошибка сервера. Повторите попытку позже.',
                error: e
            })
        }
    })

    app.get('/api/place_order', async (req, res) => {
        const cartProducts = JSON.parse(req.cookies.cart)
        const jwtCookie = req.cookies.JWT
        const secret = 'SYW/:ZIFrxd\')ueR#<Oj,ABzutT]QI({%MekfS9(l|7NM-&m6RTgP@)X44sOGVE'
        const payload = jwt.verify(jwtCookie, secret)
        const user = await db.collection('users').findOne({_id: ObjectID(payload.id)})


        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'formetood@gmail.com',
                pass: 'topotop123'
            }
        })

        const mailOptions = {
            from: 'ttestovyjndemailer@gmail.com',
            to: user.email,
            subject: 'Спасибо за Ваш заказ!',
            html: `
                        <p>
                            Здравствуйте! Ваш заказ был успешно принят. В данный момент он обрабатывается.
                        </p>
                    `
        }
        transporter.sendMail(mailOptions, err => {
            if (err) {
                throw err
            }
        })
    })

    articles.map(uri => {
        return app.get(`/api/${uri}`, async (req, res, next) => {
            try {
                const article = await articlesCol.findOne({slug: uri})
                res.send({
                    success: true,
                    data: article
                })
            } catch (e) {
                res.status(500).send({
                    success: false,
                    msg: 'Ошибка сервера. Повторите попытку позже.'
                })
            }
        })
    })
}
