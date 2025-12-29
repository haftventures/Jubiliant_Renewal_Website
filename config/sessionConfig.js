const session = require("express-session");

module.exports = session({
    secret: "secret123",
    resave: false,
    saveUninitialized: false, 
    rolling: true, 
    cookie: {
        maxAge: 15 * 60 * 1000, // 20 minutes
        sameSite: "lax"
    }
});
