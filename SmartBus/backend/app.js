import express from "express";
import { join } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import mongoose from "mongoose";
import passport from "passport";
import cors from "cors";

import loginRoute from "./routes/login.js";
import registerRoute from "./routes/register.js";
import bookingRoute from "./routes/routeSelection.js";
import loggedInPage from "./routes/loggedInUser.js";

import { MongoURI } from "./config/keys.js";
import "./auth/auth.js"; // Passport strategies

const app = express();

// ----------------- MONGODB CONNECTION -----------------
mongoose
  .connect(MongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000, // optional, avoids indefinite buffering
  })
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err.message));

// ----------------- MIDDLEWARE -----------------
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(join(process.cwd(), "public")));
app.use(passport.initialize());

// ----------------- ROUTES -----------------
app.use("/user/login", loginRoute);
app.use("/user/register", registerRoute);
app.use("/user/booking", bookingRoute);

// Protected route using JWT auth
app.use(
  "/user",
  passport.authenticate("jwt", { session: false }),
  loggedInPage
);

// ----------------- DEFAULT ROUTE -----------------
app.get("/", (req, res) => {
  res.send("Welcome to MERN Bus Booking API");
});

export default app;
