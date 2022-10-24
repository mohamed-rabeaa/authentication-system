const User = require('../models/User')
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const facebookStrategy = require('passport-facebook').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

/*
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
*/
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

const FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID;
const FACEBOOK_CLIENT_SECRET = process.env.FACEBOOK_CLIENT_SECRET;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function(token, refreshToken, profile, done) {

      // asynchronous
      process.nextTick(function() {
    
          // find the user in the database based on their facebook id
          User.findOne({ 'userid' : profile.id }, function(err, user) {
    
              // if there is an error, stop everything and return that
              // ie an error connecting to the database
              if (err)
                  return done(err);
    
              // if the user is found, then log them in
              if (user) {
                  console.log("user found")
                  console.log(user)
                  return done(null, user); // user found, return that user
              } else {
                console.log(profile)
                  // if there is no user found with that facebook id, create them
                  var newUser = new User();
    
                  // set all of the facebook information in our user model
                  newUser.userid = profile.id; // set the users facebook id                   
                  newUser.token = token; // we will save the token that facebook provides to the user                    
                  newUser.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                  newUser.gender = profile.gender
                  newUser.avatar = profile.photos[0].value
                  // save our user to the database
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

passport.use(new facebookStrategy({

  clientID        : FACEBOOK_CLIENT_ID,
  clientSecret    :  FACEBOOK_CLIENT_SECRET,
  callbackURL     : "http://localhost:5000/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'name', 'gender', 'picture.type(large)','email']

},// facebook will send back the token and profile
function(token, refreshToken, profile, done) {

  // asynchronous
  process.nextTick(function() {

      // find the user in the database based on their facebook id
      User.findOne({ 'userid' : profile.id }, function(err, user) {

          // if there is an error, stop everything and return that
          // ie an error connecting to the database
          if (err)
              return done(err);

          // if the user is found, then log them in
          if (user) {
              console.log("user found")
              console.log(user)
              return done(null, user); // user found, return that user
          } else {
            console.log(profile)
              // if there is no user found with that facebook id, create them
              var newUser = new User();

              // set all of the facebook information in our user model
              newUser.userid = profile.id; // set the users facebook id                   
              newUser.token = token; // we will save the token that facebook provides to the user                    
              newUser.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
              //newUser.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
              newUser.gender = profile.gender
              newUser.avatar = profile.photos[0].value
              // save our user to the database
              newUser.save(function(err) {
                  if (err)
                      throw err;

                  // if successful, return the new user
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
    
          // find the user in the database based on their facebook id
          User.findOne({ 'userid' : profile.id }, function(err, user) {
    
              // if there is an error, stop everything and return that
              // ie an error connecting to the database
              if (err)
                  return done(err);
    
              // if the user is found, then log them in
              if (user) {
                  console.log("user found")
                  console.log(user)
                  return done(null, user); // user found, return that user
              } else {
                console.log(profile)
                  // if there is no user found with that facebook id, create them
                  var newUser = new User();
    
                  // set all of the facebook information in our user model
                  newUser.userid = profile.id; // set the users facebook id                   
                  newUser.token = token; // we will save the token that facebook provides to the user                    
                  newUser.name  = profile.username; // look at the passport user profile to see how names are returned
                  newUser.gender = profile.gender
                  newUser.avatar = profile.photos[0].value
                  newUser.provider = profile.provider
                  // save our user to the database
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

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
      done(err, user);
  });
});




/*
passport.use(
  new GithubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

*/