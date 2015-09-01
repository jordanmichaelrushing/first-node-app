module.exports = {
    // This is your MYSQL Database configuration
    db: {
        name: 'heroku_051442760722399',
        password: 'e95164d6',
        username: 'bb476f5d8389e6',
        host: 'us-cdbr-iron-east-02.cleardb.net'
    },
    app: {
        name: "MEAN - A Modern Stack - Production"
    },
    facebook: {
        clientID: "1456935964536491",
        clientSecret: "7355ff37692379e27d60d0b6a39b8df5",
        callbackURL: "https://jordan-node.herokuapp.com/auth/facebook/callback"
    },
    twitter: {
        clientID: "cPQE671ygfLeV5PMt6Gw",
        clientSecret: "QA9jQJXhcd2NltJ716altk2jfxKfrqjRhBQgGU",
        callbackURL: "https://jordan-node.herokuapp.com/auth/twitter/callback"
    },
    google: {
        clientID: "APP_ID",
        clientSecret: "APP_SECRET",
        callbackURL: "https://jordan-node.herokuapp.com/auth/google/callback"
    }
};