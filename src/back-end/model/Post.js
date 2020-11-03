class Post {
    constructor(username, date, content, agree, disagree, comments) {
        this.username = username;
        this.date = date;
        this.content = content;
        this.agree = agree;
        this.disagree = disagree;
        this.comments = comments;
    }
}

module.exports = Post;