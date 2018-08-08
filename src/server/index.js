require('isomorphic-fetch')
import express from 'express'
import {MongoClient} from 'mongodb'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import cors from 'cors'

import React from 'react'
import {renderToString} from 'react-dom/server'
import {StaticRouter, matchPath} from 'react-router-dom'
import {createStore, applyMiddleware} from 'redux'
import {Provider as ReduxProvider} from 'react-redux'
import {SheetsRegistry} from 'react-jss/lib/jss'
import JssProvider from 'react-jss/lib/JssProvider'
import {createGenerateClassName, createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles'
import green from '@material-ui/core/colors/green'
import thunk from 'redux-thunk'

import Layout from '@containers' // Root container
import rootReducer from '@reducers'
import routes from '@common/routes'
import handleRoutes from '@server/api/routes'

const app = express()

app.use(express.static('dist'))
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(cookieParser())

global.window = {}

const htmlTemplate = (markup, reduxState, css) => {
    return `
        <!DOCTYPE html>
        <html>
            <head>
                <title>formetoo</title>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
            </head>
            
            <body>
                <div id='app'>${markup}</div>
                <!--Подключение стилей JSS-->
                <style id='jss-server-side'>${css}</style>
                <script>
                    window.REDUX_DATA = ${JSON.stringify(reduxState)}
                </script>
                <script src='/bundle.js'></script>
            </body>
        </html>
    `
}

const render = (req, res, next) => {
    if (req.url === '/')
        return res.redirect('/homepage')

    const activeRoute = routes.find(route => matchPath(req.url, route))
    if (activeRoute) {
        const sheetsRegistry = new SheetsRegistry()
        const sheetsManager = new Map()
        const theme = createMuiTheme({
            palette: {
                primary: {
                    main: green[500]
                },
                secondary: {
                    main: '#E0F2F1'
                },
                primary1Color: green[50],
                primary2Color: green[300]
            }
        })
        const generateClassName = createGenerateClassName()
        let context = {}
        const store = createStore(rootReducer, applyMiddleware(thunk))

        const markup = renderToString(
            <ReduxProvider store={store}>
                <StaticRouter location={req.url} context={context}>
                    <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
                        <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
                            <Layout/>
                        </MuiThemeProvider>
                    </JssProvider>
                </StaticRouter>
            </ReduxProvider>
        )

        const css = sheetsRegistry.toString()

        const reduxState = store.getState()

        res.send(htmlTemplate(markup, reduxState, css))
    } else
        next()
}

app.use(render)

const url = 'mongodb://localhost:27017'
MongoClient.connect(url, (err, client) => {
    if (err) throw err

    const db = client.db('testdb')

    handleRoutes(app, db)

    app.listen(7000)
})