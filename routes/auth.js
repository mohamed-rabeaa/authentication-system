const express = require('express')
const passport = require('passport')
// const jwt = require('jsonwebtoken');
const { isLoggedIn } = require('../helper/auth');

const router = express.Router()

router.get('/profile', isLoggedIn, function(req, res) {
  console.log(req.user)
  res.render('profile', {
      user : req.user // get the user out of session and pass to template
  });
});

router.get('/logout', function(req, res) {
  req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
  
});



router.get('/facebookLogin', passport.authenticate('facebook', { scope : 'profile' }));

router.get('/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect : '/auth/profile',
    failureRedirect : '/'
  }));
router.get('/googleLogin', passport.authenticate('google', { scope : 'profile' }));

router.get('/google/callback',
  passport.authenticate('google', {
    successRedirect : '/auth/profile',
    failureRedirect : '/'
  }));



// router.get("/login/success", (req, res) => {
//   if (req.user) {
//     res.status(200).json({
//       success: true,
//       message: "successfull",
//       user: req.user,
//       //   cookies: req.cookies
//     });
//   }
// });

// router.get("/login/failed", (req, res) => {
//   res.status(401).json({
//     success: false,
//     message: "failure",
//   });
// });


// router.get("/logout", (req, res) => {
//   req.logout();
//   res.redirect('/');
// }); 

// router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

// router.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     successRedirect: '/',
//     failureRedirect: "/login/failed",
//   })
// );

// router.get("/github", passport.authenticate("github", { scope: ["profile"] }));

// router.get(
//   "/github/callback",
//   passport.authenticate("github", {
//     successRedirect: '/',
//     failureRedirect: "/login/failed",
//   })
// );

// router.get("/facebook", passport.authenticate("facebook", { scope: ["profile"] }));

// router.get(
//   "/facebook/callback",
//   passport.authenticate("facebook", {
//     successRedirect: '/',
//     failureRedirect: "/login/failed",
//   })
// );

// router.post(
//   '/signup', 
//   passport.authenticate(
//     'signup', 
//     { session: false }), 
//     async (req, res, next) => {
//       console.log('sign ip')
//     res.json({
//       message: 'Signup successful',
//       user: req.user
//     });
//   }
// );

// router.post(
//   '/login',
//   async (req, res, next) => {
//     passport.authenticate(
//       'login',
//       async (err, user, info) => {
//         try {
//           if (err || !user) {
//             const error = new Error('An error occurred.');

//             return next(error);
//           }

//           req.login(
//             user,
//             { session: false },
//             async (error) => {
//               if (error) return next(error);

//               const body = { _id: user._id, email: user.email };
//               const token = jwt.sign({ user: body }, 'TOP_SECRET');

//               return res.json({ token });
//             }
//           );
//         } catch (error) {
//           return next(error);
//         }
//       }
//     )(req, res, next);
//   }
// );

module.exports = router;