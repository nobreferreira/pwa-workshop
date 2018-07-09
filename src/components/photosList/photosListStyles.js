export default theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        margin: '0.3em'
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)'
    },
    button: {
        position: 'fixed',
        bottom: '1em',
        right: '1em'
    }
});
