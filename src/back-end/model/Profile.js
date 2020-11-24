class Profile {
    constructor(picture, about, status, questionnaire, picks, tracker, ACS, links, debateQuestion, analysis) {
        this.picture = picture;
        this.about = about;
        this.status = status;
        this.questionnaire = questionnaire;
        this.picks = picks;
        this.tracker = tracker;
        this.debateQuestion = debateQuestion;
        this.analysis = analysis;
        this.ACS = ACS;
        this.links = links;
    }
}

module.exports = Profile;