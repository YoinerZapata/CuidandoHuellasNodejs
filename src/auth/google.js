const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const modeloUsuario = require('../models/usuario.model');
require('dotenv').config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, done) {
    try {
      const user = await modeloUsuario.findOne({ correo: profile.emails[0].value });

      if (user) {
        return done(null, user);
      } else {
        const nuevoUsuario = new modeloUsuario({
          nombre_completo: profile.displayName,
          correo: profile.emails[0].value,
          contraseña: "google1234",
          rol: 2
        });

        await nuevoUsuario.save();
        return done(null, nuevoUsuario);
      }
    } catch (err) {
      return done(err, null);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await modeloUsuario.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});