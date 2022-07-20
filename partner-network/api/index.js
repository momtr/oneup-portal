const config = require('./config');
const morgan = require('morgan');
const express = require('express');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const sessions = require('./config/sessions');
const notFound = require('./handlers/notFound');
const error = require('./handlers/errors');
const api = require('./routes/api/index');
const oauth = require('./routes/oauth/index');
const mongo = require('mongoose');
const OAuth2Server = require('@node-oauth/oauth2-server');
const bodyParser = require('body-parser');
const { seed } = require('./seed');
const OAuthModel = require('./oauth/model.js');

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'))
app.use(compress())
app.use(helmet());
app.disable('x-powered-by');

app.use(sessions.config)
app.use(sessions.uuid)
app.use(sessions.log)

// for serving static files, we need to allow all origins
app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    next();
})


app.use(express.static('client/static'));
app.use('/api/v1/uploads', express.static(__dirname + '/uploads'));

app.oauth = new OAuth2Server({
	model: OAuthModel,
    grants: ['password'],
	accessTokenLifetime: 60 * 60,
	allowBearerTokensInQueryString: true
});
app.use('/oauth', oauth);

app.use('/api/v1', api);

app.use(notFound);
app.use(error);
app.enable('trust proxy');


const mongo_url = config.mongodb_url;
mongo.connect(mongo_url);
const db = mongo.connection;


app.listen(config.port, () => {
    console.log('✨ server listening on port: ' + config.port);
    db.on('open', () => {
        console.log('✨ connected to the databse (MongoDB)');
        seed();
    })
})
