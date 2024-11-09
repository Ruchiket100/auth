import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import passport from "passport";
import githubRouter from "./routers/githubRouter.js";
import session from "express-session";

dotenv.config();

const app = express();




app.use(
    session({
      resave: false,
      saveUninitialized: true,
      secret: process.env.SESSION_SECRET,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

const connectToMongoDb = () => {
        mongoose
          .connect(process.env.MONGODB_URI)
          .then(() => console.log('Connected to MongoDb..'))
          .catch((error) => {
            console.log('Error in connecting to mongoDB ' + error);
            throw error;
          });
};
      
connectToMongoDb();    
    
app.get("/", (req, res) => {
    res.send("Hello World!");
});

passport.serializeUser(function (user, cb) {
    cb(null, user);
  });
  passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
  });


app.use('/auth/github', githubRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});