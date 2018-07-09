export default () => ({
    loadingContainer: {
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        'background-color': 'rgba(0,0,0,0.5)',
        'z-index': 3
    },
    loadingSpinner: {
        border: '8px solid #f3f3f3',
        'border-top': '8px solid #ffc835',
        'border-radius': '50%',
        width: '60px',
        height: '60px',
        animation: 'spin 2s linear infinite',
        margin: '300px auto 30px'
    },
    loadingMessage: {
        'text-align': 'center',
        color: 'white',
        'font-size': '16px'
    }
});
