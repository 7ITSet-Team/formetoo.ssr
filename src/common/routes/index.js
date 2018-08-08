import React from 'react'

import {Auth, Product, Cart, CartPage} from '@containers'
import {Article, Catalog} from '@components'

export default [
    {
        path: '/homepage',
        exact: true,
        component: props => <Article {...props}/>
    },
    {
        path: '/promotion',
        exact: true,
        component: props => <Article {...props}/>
    },
    {
        path: '/delivery',
        exact: true,
        component: props => <Article {...props}/>
    },
    {
        path: '/about',
        exact: true,
        component: props => <Article {...props}/>
    },
    {
        path: '/contacts',
        exact: true,
        component: props => <Article {...props}/>
    },
    {
        path: '/login',
        exact: true,
        component: props => <Auth {...props}/>
    },
    {
        path: '/register',
        exact: true,
        component: props => <Auth {...props}/>
    },
    {
        path: '/cart',
        exact: true,
        component: props => <CartPage {...props}/>
    },
    {
        path: '/catalog',
        exact: true,
        component: props => <Catalog {...props}/>
    },
    {
        path: '/catalog/:category',
        exact: true,
        component: props => <Catalog {...props}/>
    },
    {
        path: '/catalog/products/:product',
        exact: true,
        component: props => <Product {...props}/>
    },
]