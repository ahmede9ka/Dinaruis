const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const jwt = require("jsonwebtoken");
const User = require("../models/userModel"); // Import User model
require("dotenv");
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID, // Use environment variables
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://127.0.0.1:8000/api/v1/users/auth/google/callback",
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value; // Extract email safely
        const { role } = JSON.parse(request.query.state || '{}');
        console.log(role);
        let user = await User.findOne({ email });

        if (!user) {
          user = await User.create({
            firstName: profile.name?.givenName || "",
            lastName: profile.name?.familyName || "",
            email,
            googleId: profile.id,
            role: role, // Default role
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
  )
);

// ✅ Remove `serializeUser` and `deserializeUser` if using JWT only
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;
