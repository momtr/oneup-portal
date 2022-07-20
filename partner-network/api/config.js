require('dotenv').config();

module.exports = {
    port: process.env.PORT,
    mongodb_url: process.env.MONGODB_URL,
    env: process.env.ENV,
    admins: process.env.ADMINS.split(';'),
    jwt_secret: process.env.JWT_SECRET,
    production: (process.env.ENV === 'PROD')
}