const config = require("./config");
const mongo = require('mongoose');
const Client = require("./schemas/oauth/client.schema");
const log = require('./logging');
const bcrypt = require('bcrypt');


async function seed() {
    console.log('🌱 seeding database...')

    const salt = await bcrypt.genSalt(10);

    const F2CMCodeHubClient = new Client({
        id: 'F2CM-Code-Hub',
        clientId: 'F2CM-Code-Hub',
        clientSecret: await bcrypt.hash('öalksvölaiseuroilaskhnövliaw3u4r98z2odjabvo8sezrolawjnbvlö', salt),
        grants: [
            'refresh_token',
            'password'
        ],
        redirectUris: [
            'www.f2cm.at/gitea'
        ]
    });
    
    F2CMCodeHubClient.save(function(err, client) {
        if (err) {
            return log.warn(err);
        }
        log.info('Created client' + client);
    });
}

module.exports = {
    seed
}