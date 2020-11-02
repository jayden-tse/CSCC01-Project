class Post {
    constructor(username, date, content, likes, dislikes, comments) {
        this.username = username;
        this.date = date;
        this.content = content;
        this.likes = likes;
        this.dislikes = dislikes;
        this.comments = comments;
    }
}

module.exports = Post;