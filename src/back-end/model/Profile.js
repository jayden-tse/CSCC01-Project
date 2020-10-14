class Profile {
    
    Profile(picture, about, status, ACS) {
        this.picture = picture;
        this.about = about;
        this.status = status;
        this.ACS = ACS;
    }

    get picture() {
        return this.picture;
    }
    
    set picture(picture) {
        this.picture = picture;
    }

    get about() {
        return this.about;
    }

    set about(about) {
        this.about = about;
    }

    get status() {
        return this.status;
    }

    set status(status) {
        this.status = status;
    }

    get ACS() {
        return this.ACS;
    }
    
    set ACS(ACS) {
        this.ACS = ACS
    }
}