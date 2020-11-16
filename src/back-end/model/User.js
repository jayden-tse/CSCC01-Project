class User {
    constructor(username, password, email, phonenum, profile, prompt) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.phonenum = phonenum;
        this.profile = profile;
        this.prompt = prompt;
    }
}

module.exports = User;