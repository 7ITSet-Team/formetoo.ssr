export default theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 20
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 280
    },
    button: {
        marginTop: 30,
    },
    error: {
        fontSize: '0.6em',
        color: 'red',
        textAlign: 'center'
    },
    '@media (min-width: 1300px)': {
        root: {
            width: '25%'
        }
    },
    '@media (min-width: 1100px) and (max-width: 1300px)': {
        root: {
            width: '30%'
        }
    },
    '@media (min-width: 800px) and (max-width: 1100px)': {
        root: {
            width: '40%'
        }
    },
    '@media (min-width: 650px) and (max-width: 800px)': {
        root: {
            width: '50%'
        }
    },
    '@media (min-width: 510px) and (max-width: 650px)': {
        root: {
            width: '60%'
        }
    },
    '@media (min-width: 440px) and (max-width: 510px)': {
        root: {
            width: '70%'
        }
    },
    '@media (min-width: 300px) and (max-width: 440px)': {
        root: {
            width: '80%'
        },
        textField: {
            width: '80%'
        }
    },
    '@media (min-width: 200px) and (max-width: 300px)': {
        root: {
            width: '90%'
        },
        textField: {
            width: '90%'
        }
    },
    addInfo: {
        fontSize: '0.5em',
        margin: 18,
        textAlign: 'center'
    }
})