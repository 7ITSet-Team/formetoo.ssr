const webpack = require('webpack')
const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const _root = path.resolve()
const _dist = `${_root}/dist`
const _client = `${_root}/src/client`
const _server = `${_root}/src/server`
const _common = `${_root}/src/common`
const _shared = `${_root}/src/shared`

const commonAliases = {
    '@server': _server,
    '@services': `${_common}/services`,
    '@containers': `${_shared}/containers`,
    '@reducers': `${_shared}/reducers`,
    '@common': `${_root}/src/common`,
    '@actions': `${_shared}/actions`,
    '@constants': `${_shared}/constants`,
    '@styles': `${_shared}/styles`,
    '@components': `${_shared}/components`,
    '@hocs': `${_shared}/hocs`
}

const clientConfig = ({mode = 'development', analyzer = 'false'}) => ({
        entry: [
            'babel-polyfill',
            `${_client}/index.js`
        ],
        output: {
            path: _dist,
            filename: 'bundle.js'
        },
        devtool: mode === 'development' ? 'eval' : undefined,
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: '/node_modules/'
                }
            ]
        },
        resolve: {
            alias: {
                ...commonAliases
            }
        },
        plugins: [
            new webpack.DefinePlugin({
                __isBrowser__: true,
                __production__: mode !== 'development'
            }),
            analyzer === 'true'
                ? new BundleAnalyzerPlugin()
                : () => undefined
        ]
})

const serverConfig = ({mode}) => ({
    entry: [
        'babel-polyfill',
        `${_server}/index.js`
    ],
    target: 'node',
    output: {
        path: _dist,
        filename: 'launcher.js'
    },
    devtool: mode === 'development' ? 'eval' : undefined,
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node_modules/'
            }
        ]
    },
    resolve: {
        alias: {
            ...commonAliases
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            __isBrowser__: false,
            __production__: mode !== 'development'
        })
    ]
})

module.exports = (env, argv) => ([
    clientConfig(argv),
    serverConfig(argv)
])