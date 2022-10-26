const User = require('../models/User')
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const facebookStrategy = require('passport-facebook').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

const FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID;
const FACEBOOK_CLIENT_SECRET = process.env.FACEBOOK_CLIENT_SECRET;


passport.use(
  'signup',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        const user = await new User({
          email,
          password
        }).save()
        console.log(2)

        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          return done(null, false, { message: 'User not found' });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, { message: 'Wrong Password' });
        }

        return done(null, user, { message: 'Logged in Successfully' });
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new JWTstrategy(
    {
      secretOrKey: 'TOP_SECRET',
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function(token, refreshToken, profile, done) {

      process.nextTick(function() {
    
          User.findOne({ 'userid' : profile.id }, function(err, user) {
    
              if (err)
                  return done(err);
    
              if (user) {
                  console.log("user found")
                  console.log(user)
                  return done(null, user); 
              } else {
                console.log(profile)

                var newUser = new User();
    
                  newUser.userid = profile.id;         
                  newUser.token = token;              
                  newUser.name  = profile.name.givenName + ' ' + profile.name.familyName; 
                  newUser.gender = profile.gender
                  newUser.avatar = profile.photos[0].value

                  newUser.save(function(err) {
                      if (err)
                          throw err;
    
                      // if successful, return the new user
                      return done(null, newUser);
                  });
              }
    
          });
    
      })
    
    }
  )
);

passport.use(
  new facebookStrategy({

  clientID        : FACEBOOK_CLIENT_ID,
  clientSecret    :  FACEBOOK_CLIENT_SECRET,
  callbackURL     : "http://localhost:5000/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'name', 'gender', 'picture.type(large)','email']

},
function(token, refreshToken, profile, done) {

  // asynchronous
  process.nextTick(function() {

      User.findOne({ 'userid' : profile.id }, function(err, user) {

          if (err)
              return done(err);

          if (user) {
              console.log("user found")
              console.log(user)
              return done(null, user); 
          } else {
            console.log(profile)

            var newUser = new User();

              newUser.userid = profile.id;            
              newUser.token = token;           
              newUser.name  = profile.name.givenName + ' ' + profile.name.familyName;
              newUser.gender = profile.gender
              newUser.avatar = profile.photos[0].value

              newUser.save(function(err) {
                  if (err)
                      throw err;

                  return done(null, newUser);
              });
          }

      });

  })

}));

passport.use(
  new GithubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    function(token, refreshToken, profile, done) {

      // asynchronous
      process.nextTick(function() {
    
          User.findOne({ 'userid' : profile.id }, function(err, user) {

              if (err)
                  return done(err);
    
              if (user) {
                  console.log("user found")
                  console.log(user)
                  return done(null, user);
              } else {
                console.log(profile)

                var newUser = new User();
    
                  // set all of the facebook information in our user model
                  newUser.userid = profile.id;                  
                  newUser.token = token;                 
                  newUser.name  = profile.username; 
                  newUser.gender = profile.gender
                  newUser.avatar = profile.photos[0].value
                  newUser.provider = profile.provider
                 
                  newUser.save(function(err) {
                      if (err)
                          throw err;
    
                      return done(null, newUser);
                  });
              }
    
          });
    
      })
    
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
      done(err, user);
  });
});