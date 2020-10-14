class User {

    User(username, password, email, phoneNum, profile) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.phoneNum = phoneNum;
        this.profile = profile;
    }

    get id() {
        return this.id;
    }

    set id(id) {
        this.id = id;
    }
    
    get username() {
        return this.username;
    }

    set username(username) {
        this.username = username;
    }
    
    get password() {
        return this.password;
    }

    set password(password) {
        this.password = password;
    }
    
    get phoneNum() {
        return this.phoneNum;
    }

    set phoneNum(phoneNum) {
        this.phoneNum = phoneNum;
    }
    
    get profile() {
        return this.profile;
    }

    set profile(profile) {
        this.profile = profile;
    }
}