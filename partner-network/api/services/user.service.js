const bcrypt = require('bcrypt');
const User = require('../schemas/user.schema');
const randToken = require('rand-token');
const log = require('../logging');
const config = require('../config');

class UserService {

    static async getUserProfileById(id) {
        const dbUser = await User.findById(id);
        if (!dbUser) return;
        return dbUser.api_entity;
    }

    static async updateUser(userId, body) {
        const user = await User.findById(userId);
        if (!user) return { error: true };
        user.first_name = body.first_name;
        user.last_name = body.last_name;
        user.bio = body.bio;
        user.position = body.position;
        user.phone_number = body.phone_number;
        user.social_twitter = body.social_twitter;
        user.social_linkedin = body.social_linkedin;
        user.social_github = body.social_github;
        user.social_instagram = body.social_instagram;
        user.social_snapchat = body.social_snapchat;
        user.save();
        return user;
    }

    static async createUser(body) {
        if (config.admins.indexOf(body.email) >= 0) {
            const user = await this.createAdmin(body);
            return user;
        }
        const validatedToken = await this.validateAndSetActivationToken(body.activation_code);
        if (!validatedToken.error) {
            const salt = await bcrypt.genSalt(10);
            const password = await bcrypt.hash(body.password, salt);
            const giveaway_activation_token = [0, 0, 0].map(i => ({ token: randToken.generate(10), used: false }));
            const email_token = randToken.generate(20);
            const user = new User({
                first_name: body.first_name,
                last_name: body.last_name,
                bio: body.bio,
                position: body.position,
                email: body.email,
                phone_number: body.phone_number,
                social_twitter: body.social_twitter,
                social_linkedin: body.social_linkedin,
                social_github: body.social_github,
                social_instagram: body.social_instagram,
                social_snapchat: body.social_snapchat,
                password,
                roles: ['USER'],
                giveaway_activation_token,
                used_activation_token: body.activation_code,
                profile_picture: null,
                email_verified: true,
                really_email_verified: false,
                email_token,
                documents: []
            });
            await user.save();
            return user;
        } else {
            return { error: 'TOKEN_CANNOT_BE_USED' }
        }
    }

    static async userExists(email) {
        const user = await User.findOne({ email });
        if (user) return true;
        return false;
    }

    static async logUserIn(email, password) {
        const user = await User.findOne({ email, email_verified: true });
        if (!user) return false;
        const hashedPassword = await bcrypt.compare(password, user.password);
        if (hashedPassword) return user;
        return false;
    }

    static async validateAndSetActivationToken(token) {
        const dbUser = await User.findOne({ giveaway_activation_token: { $elemMatch: { token } } });
        if (!dbUser) {
            log.warn('token not found');
            return { error: true };
        }
        let userToken = dbUser.giveaway_activation_token.find(i => i.token === token);
        log.info(`user token ${userToken}`);
        if (userToken.used) {
            log.warn('token already used');
            return { error: true }
        }
        log.info('validated token and set used to true');
        userToken.used = true;
        await dbUser.save();
        return dbUser;
    }

    static async createAdmin(body) {
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(body.password, salt);
        const giveaway_activation_token = [0, 0, 0].map(i => ({ token: randToken.generate(64), used: false }));
        const email_token = randToken.generate(20);
        const user = new User({
            first_name: body.first_name,
            last_name: body.last_name,
            bio: body.bio,
            position: body.position,
            email: body.email,
            phone_number: body.phone_number,
            social_twitter: body.social_twitter,
            social_linkedin: body.social_linkedin,
            social_github: body.social_github,
            social_instagram: body.social_instagram,
            social_snapchat: body.social_snapchat,
            password,
            roles: ['USER', 'ADMIN'],
            giveaway_activation_token,
            used_activation_token: body.activation_code,
            profile_picture: body.profile_picture,
            email_verified: true,
            really_email_verified: true,
            email_token,
            documents: []
        });
        await user.save();
        log.info(`added admin user ${body.email}`);
        return user;
    }

    static async logUserIn(email, password) {
        const user = await User.findOne({ email });
        if (!user) return false;
        const hashedPassword = await bcrypt.compare(password, user.password);
        if (hashedPassword) return user;
        return false;
    }

    static async getUserProfileById(id) {
        const user = await User.findById(id);
        if (!user) return { error: true };
        return user;
    }

    static async getAllUserProfiles(page = 0) {
        const users = await User.find()
            .sort({ numOfPosts: -1, registered_on: 1 })
            .skip(page * 10)
            .limit(10);
        return users.map((u, key) => ({
            page,
            element: page * 10 + key,
            user: {
                _id: u._id,
                first_name: u.first_name,
                last_name: u.last_name,
                bio: u.bio,
                position: u.position,
                email: u.email,
                phone_number: u.phone_number,
                social_twitter: u.social_twitter,
                social_linkedin: u.social_linkedin,
                social_github: u.social_github,
                social_instagram: u.social_instagram,
                social_snapchat: u.social_snapchat,
                registered_on: u.registered_on,
                documents: u.documents,
                badges: u.badges,
                numOfPosts: u.numOfPosts,
                profile_picture: u.profile_picture
            }
        }));
    }

    static async setUserProfileImage(userId, imagePath) {
        log.info(`image path: ${imagePath}`);
        const user = await User.findById(userId);
        if (!user) return { error: true };
        user.profile_picture = imagePath;
        user.save();
        return user;
    }

    static async storeDocumentForUser(userId, documentPath, details) {
        const user = await User.findById(userId);
        if (!user) return { error: true };
        user.documents.push({ documentPath, details })
        user.save();
        return { documentPath, details, error: user.error };
    }

    static async generateBadgeStateForUser(user) {
        const badges = [];
        if (user.numOfPosts > 7) {
            badges.push({ code: '🤩 ULTIMATE', theme: '#6B5B95' });
        } else if (user.numOfPosts > 5) {
            badges.push({ code: '🤖 PRO', theme: '#88B04B' });
        } else if (user.numOfPosts > 2) {
            badges.push({ code: '⚡️ SKYROCKETER', theme: '#FF6F61' });
        } else if (user.numOfPosts > 1) {
            badges.push({ code: '✨ BEGINNER', theme: '#92A8D1' });
        }
        user.badges = badges;
        user.save();
    }

}

module.exports = UserService;
