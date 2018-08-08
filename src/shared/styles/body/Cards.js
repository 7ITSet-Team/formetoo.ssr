export default theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    card: {
        width: 250,
        minWidth: 200,
        margin: 20,
        height: 340,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        paddingBottom: 10,
        paddingTop: 10
    },
    media: {
        width: 200,
        height: 200
    },
    title: {
        fontSize: '0.8em'
    },
    link: {
        color: 'black',
        textDecoration: 'none'
    },
    button: {
        backgroundColor: theme.palette.primary1Color,
        color: theme.palette.primary2Color
    }
})