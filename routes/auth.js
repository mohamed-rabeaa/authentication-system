const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken');

// const bcrypt = require('bcrypt')
// const User = require('../models/User')
// const { checkNotAuthenticated } = require('../helper/auth')

const router = express.Router()


router.post(
  '/signup', 
  passport.authenticate(
    'signup', 
    { session: false }), 
    async (req, res, next) => {
      console.log('sign ip')
    res.json({
      message: 'Signup successful',
      user: req.user
    });
  }
);

router.post(
  '/login',
  async (req, res, next) => {
    passport.authenticate(
      'login',
      async (err, user, info) => {
        try {
          if (err || !user) {
            const error = new Error('An error occurred.');

            return next(error);
          }

          req.login(
            user,
            { session: false },
            async (error) => {
              if (error) return next(error);

              const body = { _id: user._id, email: user.email };
              const token = jwt.sign({ user: body }, 'TOP_SECRET');

              return res.json({ token });
            }
          );
        } catch (error) {
          return next(error);
        }
      }
    )(req, res, next);
  }
);






// router.get('/login', checkNotAuthenticated, (req, res) => {
//   res.render('login.ejs')
// })

// router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
//   successRedirect: '/',
//   failureRedirect: '/auth/login',
//   failureFlash: true
// }))

// router.get('/register', checkNotAuthenticated, (req, res) => {
//   res.render('register.ejs')
// })

// router.post('/register', checkNotAuthenticated, async (req, res) => {
//   try {
//     console.log(11)
//     const user = await User.findOne({email: req.body.email})
//     console.log(22)
    
//     if(user) return res.redirect('/login')
//     console.log(33)
    
//     const hashedPassword = await bcrypt.hash(req.body.password, 10)
//     console.log(44)
//       console.log('new user 1')
//       await new User({
//         name: req.body.name,
//         email: req.body.email,
//         password: hashedPassword
//       }).save()
      
//       console.log('new user 2')

//       res.redirect('/auth/login')

//   } catch {
//       res.redirect('/auth/register')
//   }
// })

// router.delete('/logout', async(req, res) => {
//   req.logout(function(err) {
//     if (err) { return next(err); }
//     res.redirect('/auth/login');
//   });
// })

module.exports = router;