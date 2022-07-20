const mongoose = require('mongoose');

const clientSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
        index: { unique: true, sparse: true }
    },
    clientId: {
        type: String,
        required: true,
        index: { unique: true, sparse: true }
    },
    clientSecret: {
        type: String,
        required: true
    },
    grants: [String],
    redirectUris: [String]
});

const clinets = mongoose.model('Client', clientSchema);
module.exports = clinets;