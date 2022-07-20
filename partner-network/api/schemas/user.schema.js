const mongoose = require('mongoose');
const randToken = require('rand-token');

const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    phone_number: String,
    social_twitter: String,
    social_linkedin: String,
    social_github: String,
    social_instagram: String,
    social_snapchat: String,
    registered_on: {
        type: Date,
        default: new Date(),
    },
    roles: {
        type: [String],
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    giveaway_activation_token: [{
        token: {
            type: String,
            default: function() {
                return randToken.generate(10);
            }
        },
        used: Boolean
    }],
    used_activation_token: {
        required: true,
        type: String
    },
    profile_picture: String,
    email_verified: Boolean,
    really_email_verified: Boolean,
    email_token: String,
    documents: [{
        documentPath: String,
        lastModified: {
            type: Date,
            default: new Date()
        },
        accessedBy: [mongoose.Schema.Types.ObjectId],
        details: mongoose.Schema.Types.Mixed
    }],
    numOfPosts: Number,
    badges: [
        {
            code: String,
            registered_on: {
                type: Date,
                default: new Date(),
            },
            theme: String
        }
    ]
});

userSchema
    .virtual('api_entity')
    .get(() => ({
        first_name: this.first_name,
        last_name: this.last_name,
        bio: this.bio,
        position: this.position,
        phone_number: this.phone_number,
        email: this.email,
        profile_picture: this.profile_picture
    }));

/** full text search => index all String fields at User */
userSchema.index({'$**': 'text'});

const users = mongoose.model('User', userSchema);
module.exports = users;
