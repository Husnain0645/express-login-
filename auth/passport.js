require("dotenv").config();
const passport = require("passport");
const passportJwt = require("passport-jwt");
const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;
const User = require("../models/user");
var cookieExtractor = function (req) {
  var token = null;
  if (req && req.cookies) token = req.cookies["token"];
  return token;
};

var headerExtractor = function (req) {
  var token = req.headers["token"];
  return token;
};

passport.use(
  new StrategyJwt(
    {
      jwtFromRequest: headerExtractor,
      secretOrKey: process.env.JWT_SECRET,
    },
    function (jwtPayload, done) {
      return User.findOne({ where: { id: jwtPayload.id } })
        .then((user) => {
          return done(null, user);
        })
        .catch((err) => {
          return done(err);
        });
    }
  )
);
module.exports = {passport};