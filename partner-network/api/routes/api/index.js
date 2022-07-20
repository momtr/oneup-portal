const express = require('express');
const { validate, ValidationError, Joi } = require('express-validation');
const { login, register, update } = require('../../validation/user.validation.js');
const { newPost } = require('../../validation/post.validation');
const log = require('../../logging');
const UserService = require('../../services/user.service');
const PostService = require('../../services/post.service');
const ApiError = require('../../utils/apiError');
const httpStatus = require('http-status');
const config = require('../../config');
const jwt = require('jsonwebtoken');
const { setUser } = require('../../middleware/auth.middleware');
const { uploadImageMiddlware, uplaodFileMiddleware } = require('../../middleware/uplaod.middleware');

const router = express.Router();

router.route('/auth/signup').post(validate(register), async (req, res, next) => {
    log.info('register new user');
    const userExists = await UserService.userExists(req.body.email);
    log.info(`email: ${req.body.email}; userExists = ${userExists}`)
    if(userExists) {
        next(new ApiError(`user with email ${req.body.email} already exists`, undefined, undefined, httpStatus.BAD_REQUEST));
        return;
    }
    const user = await UserService.createUser(req.body);
    if(!user.error) {
        res.status(200).json({ user })
    } else {
        next(new ApiError(`activation code cannot be used`, undefined, undefined, httpStatus.BAD_REQUEST));
        return;
    }
}) 

router.route('/auth/signin').post(validate(login), async (req, res, next) => {
    log.info('login user');
    const loggedInUser = await UserService.logUserIn(req.body.email, req.body.password);
    if(!loggedInUser) {
        next(new ApiError('wrong username or password or account not activated', undefined, undefined, httpStatus.UNAUTHORIZED));
        return;
    }
    const payload = { _id: loggedInUser._id, email: loggedInUser.email }
    jwt.sign(payload, config.jwt_secret, { expiresIn: '20d' }, (err, token) => {
        if(err) next(new ApiError(err.message, err.name, undefined, 500));
        res.status(200).send({ token })
    })
})

router.route('/profiles/me/profile-picture').post(setUser, async (req, res, next) => {
    await uploadImageMiddlware(req, res);
    const userId = req.user._id;
    if(!req.file) {
        log.error('no image file provided');
        next(new ApiError('no image file provided', undefined, undefined, httpStatus.BAD_REQUEST));
        return;
    }
    log.info(`set profile picture for user with id ${userId}`);
    const newUser = await UserService.setUserProfileImage(userId, req.file.path);
    if(!newUser || newUser.error) {
        log.error(newUser.error);
        next(new ApiError('could not set profile image', undefined, undefined, httpStatus.INTERNAL_SERVER_ERROR));
        return;
    } else {
        res.status(200).json({ profile_picture: newUser.profile_picture })
    }
})

router.route('/profiles').get(setUser, async (req, res, next) => {
    const page = parseInt(req.query.page) || 0;
    const query = req.query.q;
    log.info(`get list of profiles; page: ${page}; query: ${query}`);
    const users = await UserService.getAllUserProfiles(page, query);
    if(!users) {
        next(new ApiError('could not get user profiles', undefined, undefined, httpStatus.INTERNAL_SERVER_ERROR));
        return;
    }
    res.status(200).json({ 
        page,
        size: users.length,
        users
    })
})

router.route('/documents').post(setUser, async (req, res, next) => {
    log.info('post new document');
    await uplaodFileMiddleware(req, res);
    const userId = req.user._id;
    if(!req.file || !req.file.path) {
        next(new ApiError('no document file provided', undefined, undefined, httpStatus.BAD_REQUEST));
        return;
    }
    const documentInfo = await UserService.storeDocumentForUser(userId, req.file.path, req.file);
    if(!documentInfo || documentInfo.error) {
        next(new ApiError('could not store document', undefined, undefined, httpStatus.INTERNAL_SERVER_ERROR));
        return;
    } else {
        res.status(200).json(documentInfo)
    }
})

router.route('/posts').post(setUser, validate(newPost), async (req, res, next) => {
    log.info(`user ${req.user._id} wants to post a new post`);
    const post = await PostService.createNewPost(req.user._id, req.body.text, req.body.attached_documents);
    if(!post || post.error) {
        next(new ApiError('could not create post', undefined, undefined, httpStatus.INTERNAL_SERVER_ERROR));
        return;
    }
    res.status(200).json({ post });
})

router.route('/posts/:postId/like').put(setUser, async (req, res, next) => {
    log.info(`user ${req.user._id} wants to like post ${req.params.postId}`);
    try {
        const newPost = await PostService.likePost(req.params.postId, req.user._id);
        if(newPost.code === 'POST_NOT_FOUND') {
            next(new ApiError('could not find post', 'POST_NOT_FOUND', undefined, httpStatus.NOT_FOUND));
            return;
        }
        if(newPost.code === 'USER_ALREADY_LIKED_POST') {
            next(new ApiError('user already liked post', 'USER_ALREADY_LIKED_POST', undefined, httpStatus.ALREADY_REPORTED));
            return;
        }
        if(!newPost || newPost.error) {
            next(new ApiError('could not like post', undefined, undefined, httpStatus.INTERNAL_SERVER_ERROR));
            return;
        }
        res.status(200).json({ success: true });
    } catch(error) {
        log.error(error);
        next(new ApiError('could not like post. maybe the post does not exist', 'POST_NOT_LIKED', undefined, httpStatus.BAD_REQUEST));
        return;
    }
})

router.route('/feed').get(setUser, async (req, res, next) => {
    const page = parseInt(req.query.page) || 0;
    log.info(`get list of posts; page: ${page}`);
    const posts = await PostService.getFeed(page, req.user._id);
    if(!posts) {
        next(new ApiError('could not get posts', undefined, undefined, httpStatus.INTERNAL_SERVER_ERROR));
        return;
    }
    res.status(200).json({
        page, 
        size: posts.length,
        posts
    })
})

router.route('/profiles/me').get(setUser, async (req, res, next) => {
    log.info('get my profile');
    const userId = req.user._id;
    const user = await UserService.getUserProfileById(userId);
    if(!user.error) {
        res.status(200).json({ user })
    } else {
        next(new ApiError('user profile not found', undefined, undefined, httpStatus.NOT_FOUND));
        return;
    }
})

router.route('/profiles/me').put(setUser, validate(update), async (req, res, next) => {
    log.info(`user ${req.user._id} wants to change their profile`);
    const userId = req.user._id;
    const newUser = UserService.updateUser(userId, req.body);
    if(!newUser || newUser.error) {
        next(new ApiError('could not update user', undefined, undefined, httpStatus.INTERNAL_SERVER_ERROR));
        return;
    }
    res.status(200).json({ success: true });
}) 

module.exports = router;
