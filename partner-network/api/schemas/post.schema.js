const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    registered_on: {
        type: Date,
        default: new Date(),
    },
    author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    likes: [{
        liker: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        time: {
            type: Date,
            default: new Date()
        }
    }],
    attached_documents: mongoose.Schema.Types.Mixed
});

const posts = mongoose.model('Post', postSchema);
module.exports = posts;
