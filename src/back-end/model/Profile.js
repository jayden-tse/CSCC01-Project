class Profile {
    constructor(_id, picture, about, status, questionnaire, picks, tracker, ACS, links, debatequestion, debatetier, votes) {
        this._id = _id;
        this.picture = picture;
        this.about = about;
        this.status = status;
        this.questionnaire = questionnaire;
        this.picks = picks;
        this.tracker = tracker;
        this.debatequestion = debatequestion;
        this.debatetier = debatetier;
        this.ACS = ACS;
        this.links = links;
        this.votes = votes;
    }
}

module.exports = Profile;