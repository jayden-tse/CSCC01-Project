class User {

    User(username, password, email, phoneNum, questionaire, profile) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.phoneNum = phoneNum;
        this.questionaire = questionaire;
        this.profile = profile;
    }

    get questionaire() {
        return this.questionaire;
    }

    set questionaire(questionaire) {
        this.questionaire = questionaire;
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
    
    get questionaire() {
        return this.questionaire;
    }

    set questionaire(questionaire) {
        this.questionaire = questionaire;
    }
    
    get profile() {
        return this.profile;
    }

    set profile(profile) {
        this.profile = profile;
    }
}