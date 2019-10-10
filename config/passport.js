const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { secret } = require('../config/params')
const mongoose = require('mongoose')
const User = mongoose.model('user')
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secret;

module.exports = passport => {
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.findOne({ stu_id: jwt_payload.stu_id }).then(user => {
      if (user) {
        return done(null, user)
      }
      return done(null, false)
    }).catch(err => console.log(err))

  }))
}