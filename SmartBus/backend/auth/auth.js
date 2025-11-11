import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

// ----------------- LOCAL STRATEGY -----------------
passport.use(
  "login",
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) return done(null, false, { message: "User not found" });

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return done(null, false, { message: "Wrong password" });

        return done(null, user, { message: "Logged in successfully" });
      } catch (err) {
        return done(err);
      }
    }
  )
);

// ----------------- JWT STRATEGY -----------------
passport.use(
  new JWTStrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (err) {
        done(err);
      }
    }
  )
);
