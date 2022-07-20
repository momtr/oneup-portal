const Post = require('../schemas/post.schema');
const User = require('../schemas/user.schema');
const log = require('../logging');
const UserService = require('./user.service');


class PostService {

    static async createNewPost(authorUserId, text, attached_documents) {
        if (!text || !attached_documents) return { error: true };
        const author = await User.findById(authorUserId);
        if (!author) return { error: true };
        const post = new Post({
            text,
            author,
            attached_documents
        });
        log.info(`new post created: ${post._id}`);
        post.save();
        if (!author.numOfPosts)
            author.numOfPosts = 0;
        author.numOfPosts++;
        UserService.generateBadgeStateForUser(author);
        return post;
    }

    static async likePost(postId, userId) {
        const liker = await User.findById(userId);
        if (!liker) return { error: true };
        const post = await Post.findById(postId);
        if (!post) return { error: true, code: 'POST_NOT_FOUND' };
        if (post.likes.find(like => like.liker == userId))
            return {
                error: true,
                code: 'USER_ALREADY_LIKED_POST'
            };
        post.likes.push({ liker });
        post.save();
        return post;
    }

    static async getFeed(page = 0, userId) {

        const posts = await Post.find()
            .sort({ registered_on: 'descending' })
            .skip(page * 10)
            .limit(10)
            .populate('author')
            .populate('likes.liker');

        

        return posts.map((post, key) => {
            return {
                page,
                element: page * 10 + key,
                post: {
                    id: post._id,
                    text: post.text,
                    registered_on: post.registered_on,
                    attached_documents: post.attached_documents,
                    author: {
                        first_name: post.author.first_name,
                        last_name: post.author.last_name,
                        bio: post.author.bio,
                        position: post.author.position,
                        registered_on: post.author.registered_on,
                        profile_picture: post.author.profile_picture
                    },
                    likes: post.likes.map((like, key) => ({
                        likeNum: key,
                        liker: {
                            first_name: like.liker.first_name,
                            last_name: like.liker.last_name,
                            profile_picture: like.liker.profile_picture
                        },
                        time: like.time
                    })),
                    liked: userId && post.likes.some((like) => like.liker._id == userId)
                }
            }
        })
    }

}

module.exports = PostService;
