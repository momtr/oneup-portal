const { Joi } = require('express-validation');

module.exports = {

    login: {
        body: Joi.object({
            email: Joi.string().email().max(100).required(),
            password: Joi.string().min(5).max(256).required()
        })
    },

    /*
        Don't forget about names like:

            Mathias d'Arras
            Martin Luther King, Jr.
            Hector Sausage-Hausen

    */
    register: {
        body: Joi.object({
            first_name: Joi.string().max(100).regex(/^[a-z ,.'-]+$/i).required(),
            last_name: Joi.string().max(100).regex(/^[a-z ,.'-]+$/i).required(),
            email: Joi.string().email().max(100).required(),
            password: Joi.string().min(5).max(256).required(),
            activation_code: Joi.string().length(10).required(),
            bio: Joi.string().max(1024).required(),
            position: Joi.string().max(100).required(),
            phone_number: Joi.string().max(20),
            social_twitter: Joi.string().max(124).optional(),
            social_linkedin: Joi.string().max(124).optional(),
            social_github: Joi.string().max(124).optional(),
            social_instagram: Joi.string().max(124).optional(),
            social_snapchat: Joi.string().max(124).optional()
        })
    },

    update: {
        body: Joi.object({
            first_name: Joi.string().max(100).alphanum().required(),
            last_name: Joi.string().max(100).alphanum().required(),
            bio: Joi.string().max(1024).required(),
            position: Joi.string().max(100).required(),
            phone_number: Joi.string().max(20),
            social_twitter: Joi.string().max(124).optional(),
            social_linkedin: Joi.string().max(124).optional(),
            social_github: Joi.string().max(124).optional(),
            social_instagram: Joi.string().max(124).optional(),
            social_snapchat: Joi.string().max(124).optional()
        })
    }

}

