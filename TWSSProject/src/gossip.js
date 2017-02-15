var gossip = [
    "Most likely to set a fire while cooking a cheese pita",
    "Most likely to get beat up by a 13-year-old girl",
    "Most likely to set one's hair on fire in a drunken state of being",
    "Most likely to have a nanny cam set up to monitor their household of cats while at work",
    "Most likely to sleep with a friend's mom",
    "Most likely to get naked at a boss's pool party",
    "Most likely to skip out on a double date valentine's lunch to have sex in the bathroom",
    "Most likely to hire a hitman to knock out kneecaps with a lead pipe",
    "Most likely to own the nickname boner champ",
    "Most likely to win a dance party"
    ];

module.exports = {
    populateGossip : function() {
    var index = gossip.length;
    var gossipNumber = Math.floor(Math.random()*index);
    var g = gossipModule.gossip[gossipNumber];
    return g;
    }
};