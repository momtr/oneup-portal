const session = require('express-session');
const uuid = require('uuid');

module.exports = {
    
    /**
     * @description configure session
     */
    config: session({
        genid: req => uuid.v4(),
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true
    }),

    /**
     * @description assigns uuid
     */
    uuid: (req, res, next) => {
        if(!req.session.uuid)
            req.session.uuid = uuid.v4();
        next();
    },

    /**
     * @description logging
     */
    log: (req, res, next) => {
        console.log(`🔒 session: ${req.session.uuid}`);
        next();
    }

}