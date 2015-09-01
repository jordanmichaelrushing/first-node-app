module.exports = {
    // This is your MYSQL Database configuration
    db: {
        name: 'jordan_polling',
        password: '',
        username: 'root',
        host: 'localhost',
        port: 3306
    },
    app: {
        name: "M*EAN Stack - Development"
    },
    facebook: {
        clientID: "1456935964536491",
        clientSecret: "7355ff37692379e27d60d0b6a39b8df5",
        callbackURL: "http://localhost:3000/auth/facebook/callback"
    },
    twitter: {
        clientID: "cPQE671ygfLeV5PMt6Gw",
        clientSecret: "QA9jQJXhcd2NltJ716altk2jfxKfrqjRhBQgGU",
        callbackURL: "http://localhost:3000/auth/twitter/callback"
    },
    google: {
        realm: "http://localhost:3000/",
        callbackURL: "http://localhost:3000/auth/google/callback"
    }
}
