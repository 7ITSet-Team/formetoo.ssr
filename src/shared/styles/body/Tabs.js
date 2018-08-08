export default theme => ({
    tabs: {
        backgroundColor: theme.palette.primary.main
    },
    tab: {
        color: '#CFD8DC'
    },
    selectTab: {
        color: '#CFD8DC',
        display: 'flex',
        flexDirection: 'column'
    },
    select: {
        position: 'absolute',
        width: 160,
        left: -1,
        opacity: '0'
    },
    paper: {
        marginTop: 50
    },
    link: {
        color: 'black',
        textDecoration: 'none'
    }
})