const { Joi } = require('express-validation');

module.exports = {

    newPost: {
        body: Joi.object({
            text: Joi.string().min(2).max(1000).required(),
            attached_documents: Joi.object().pattern(
                Joi.string().min(1).max(100),
                Joi.object({
                    display_name: Joi.string().min(1).max(100).required()
                })
            ).required(),
        })
    }

}

