import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import {BrowserRouter as Router} from 'react-router-dom'
import {Provider as ReduxProvider} from 'react-redux'
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles'
import green from '@material-ui/core/colors/green'
import {ScrollContext} from 'react-router-scroll-4' // Для автоматического скроллинга при смене маршрута
import thunk from 'redux-thunk'

import Layout from '@containers'
import rootReducer from '@reducers'

window.deviceWidth = __isBrowser__ ? (window.innerWidth > 0) ? window.innerWidth : screen.width : undefined

class Main extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const jssStyles = document.getElementById('jss-server-side')
        if (jssStyles && jssStyles.parentNode) {
            jssStyles.parentNode.removeChild(jssStyles)
        }
    }

    render() {
        return (
            <Layout/>
        )
    }
}

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

const store = createStore(rootReducer, window.REDUX_DATA, applyMiddleware(thunk))
const jsx = (
    <ReduxProvider store={store}>
        <Router>
            <ScrollContext>
                <MuiThemeProvider
                    theme={theme}
                >
                    <Main/>
                </MuiThemeProvider>
            </ScrollContext>
        </Router>
    </ReduxProvider>
)

const app = document.querySelector('#app')

ReactDOM.hydrate(jsx, app)