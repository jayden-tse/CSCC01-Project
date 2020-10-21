class User {
    constructor(username, password, email, phoneNum, profile) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.phoneNum = phoneNum;
        this.profile = profile;
    }
}

module.exports = User;