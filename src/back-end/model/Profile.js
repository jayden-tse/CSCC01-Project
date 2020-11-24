class Profile {
    constructor(picture, about, status, questionnaire, picks, tracker, debateQuestion, analysis, ACS) {
        this.picture = picture;
        this.about = about;
        this.status = status;
        this.questionnaire = questionnaire;
        this.picks = picks;
        this.tracker = tracker;
        this.debateQuestion = debateQuestion;
        this.analysis = analysis;
        this.ACS = ACS;
    }
}

module.exports = Profile;