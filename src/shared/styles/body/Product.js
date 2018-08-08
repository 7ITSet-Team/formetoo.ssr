export default {
    root: {
        width: '70%',
        paddingTop: 30,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    paper: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 30
    },
    header: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    media: {
        textAlign: 'center',
        width: '40%'
    },
    photo: {
        border: '1px solid lightgray',
        width: 300,
        height: 300
    },
    '@media (max-width: 1149px)': {
        photo: {
            width: 250,
            height: 250
        },
    },
    '@media (max-width: 967px)': {
        photo: {
            width: 200,
            height: 200
        }
    },
    '@media (max-width: 757px)': {
        media: {
            width: '100%'
        },
        photo: {
            width: 300,
            height: 300
        }
    },
    '@media (max-width: 457px)': {
        media: {
            width: '100%'
        },
        photo: {
            width: 250,
            height: 250
        }
    },
    '@media (max-width: 385px)': {
        media: {
            width: '100%'
        },
        photo: {
            width: 200,
            height: 200
        }
    },
    '@media (max-width: 313px)': {
        media: {
            width: '100%'
        },
        photo: {
            width: 150,
            height: 150
        }
    },
    tabs: {
        width: '100%',
        marginTop: 50
    },
    tab: {
        marginTop: 20,
        fontSize: '0.8em'
    }
}