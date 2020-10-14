class Profile {
    
    Profile(picture, about, status, questionaire, ACS) {
        this.picture = picture;
        this.about = about;
        this.status = status;
        this.questionnaire = questionnaire;
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

    get questionnaire() {
        return this.questionnaire;
    }

    set questionnaire(questionnaire) {
        this.questionnaire = questionnaire;
    }

    get ACS() {
        return this.ACS;
    }

    set ACS(ACS) {
        this.ACS = ACS
    }
}