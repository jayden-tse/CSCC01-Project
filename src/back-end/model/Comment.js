class Comment {
    constructor(username, date, text, agrees, disagrees) {
        this.username = username;
        this.date = date;
        this.text = text;
        this.agrees = agrees;
        this.disagrees = disagrees;
    }
}

module.exports = Comment;