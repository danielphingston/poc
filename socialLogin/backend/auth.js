const passport = require("passport");
const Strategy = require("passport-twitter");

module.exports = function () {
    passport.use(
        new Strategy(
            {
                consumerKey: process.env.TWITTER_CONSUMER_KEY,
                consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
                callbackURL: "/callback/twitter",
            },
            function (token, tokenSecret, profile, cb) {
                return cb(null, profile);
            }
        )
    );
    passport.serializeUser(function (user, cb) {
        cb(null, user);
    });

    passport.deserializeUser(function (obj, cb) {
        cb(null, obj);
    });
};
