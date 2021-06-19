module.exports = {
    siteName: 'Jens blog',
    siteDesc: 'Blog och anteckningsblock för Jens Andreasson',
    colors: {
        fg: '#fff',
        bg: '#121212'
    },
    author: {
        name: 'Jens Andreasson',
        email: 'jensandreasson77@gmail.com',
        url: 'https://jensa.xyz'
    },
    url: process.env.URL || 'http://localhost:8080',
    time: Date.now(),
    locale: 'sv-SE'
};
