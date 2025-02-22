const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const GOOGLE_CLIENT_ID = '';
const GOOGLE_CLIENT_SECRET = '';

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:8000/api/v1/users",
    passReqToCallback: true
  },
  async (request, accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails[0].value; // Extract email safely

      let user = await User.findOne({ email });

      if (!user) {
        user = await User.create({
          firstName: profile.name.givenName || "",
          lastName: profile.name.familyName || "",
          email,
          googleId: profile.id,
          role: "INVESTOR", // Match schema's default role
        });
      }

      // Generate JWT Token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      return done(null, { user, token });
    } catch (error) {
      return done(error, null);
    }
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = passport;
