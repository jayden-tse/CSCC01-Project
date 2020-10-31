class Post {
    constructor(user, date, content, likes, dislikes, comments) {
        this.user = user;
        this.date = date;
        this.content = content;
        this.likes = likes;
        this.dislikes = dislikes;
        this.comments = comments;
    }
}

module.exports = Post;