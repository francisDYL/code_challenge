import passport from "passport";
import passportLocal from "passport-local";
import User from "../models/User";

const LocalStrategy = passportLocal.Strategy;

passport.use('signUp', new LocalStrategy({
  usernameField : 'email',
  passwordField : 'password',
}, async (email, password, done) => {
    try {
      //Save the information provided by the user to the the database
      const user = await User.findOne({ email });

      if(user){
        return done(null,false,{message:'An account using this email already exist'});
      }
      else{
      const user = await User.create({ email, password });
      //Send the user information to the next middleware
      return done(null, user);
      }
    } catch (error) {
      done(error);
    }
}));

passport.use('signIn', new LocalStrategy({
  usernameField : 'email',
  passwordField : 'password',
}, async (email, password, done) => {
  try {
    //Find the user associated with the email provided by the user
    const user = await User.findOne({ email });
    if( !user ){
      //If the user isn't found in the database, return a message
      return done(null, false, {message: 'User not found'});
  
    }
    else{
      const hashPassword = user.toObject().password;
      const isValid = await user.schema.methods.isValidPassword(password,hashPassword);
      if(!isValid){
        return done(null, false, { message : 'Wrong Password'});
      }
      else{
        
        return done(null, user);
      }
    } 
  } catch (error) {
    return done(error);
  }
}));

passport.serializeUser(function(user: any, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

export let isAuthenticated = (req, res, next) => {
  if(req.session.user) {return next();}
};