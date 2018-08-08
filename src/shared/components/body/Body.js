import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import {Route, Switch} from 'react-router-dom'

import {Tabs} from '@containers'
import styles from '@styles/body/Body'
import routes from '@common/routes'

export default withStyles(styles)(({classes}) => (
    <div
        className={classes.content}
    >
        <Tabs/>
        <div
            className={classes.container}
        >
            <Switch>
                {routes.map((route, index) => (
                    <Route
                        exact={route.exact}
                        path={route.path}
                        component={props => route.component(props)}
                        key={index}
                    />
                ))}
                <Route
                    component={() => {
                        return (
                            <div>
                                404 ERROR
                            </div>
                        )
                    }}
                />
            </Switch>
        </div>
    </div>
))