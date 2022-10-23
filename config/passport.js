const User = require('../models/User')
const passport = require('passport');


const localStrategy = require('passport-local').Strategy;
// ...

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
  'signup',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        console.log(1)
        console.log("frist",email, password)
        //console.log(req.body.email, req.body.password)
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

// ...

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

/* 
function initialize(passport) {
  const authenticateUser = async (email, password, done) => {
   
    const user = await User.findOne({email})
    
    if (!user) {
      return done(null, false, { message: 'No user with that email' })
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Password incorrect' })
      }
    } catch (error) {
      return done(error)
    }
  }

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser(async(id, done) => {
    const user = await User.findById(id)
    return done(null, user)
  })
} 
*/