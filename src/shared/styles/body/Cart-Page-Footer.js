import green from '@material-ui/core/colors/green'

export default {
    footer: {
        display: 'flex',
        justifyContent: 'space-around'
    },
    cardTitle: {

    },
    root: {
        color: green[600],
        '&$checked': {
            color: green[500],
        },
    },
    checked: {

    },
    card: {
        padding: 20,
        marginBottom: 20,
        width: '30%'
    },
    checkTitle: {
        fontSize: '0.6em',
        marginTop: 10
    },
    info: {
        fontSize: '0.6em',
        marginTop: 10,
        display: 'flex',
        justifyContent: 'space-between'
    },
    delimiter: {
        backgroundColor: 'lightgray',
        height: 1,
        marginTop: 20,
        marginBottom: 20
    },
    button: {
        marginTop: 30,
        width: '100%',
        color: 'white'
    }
}