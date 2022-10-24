// exports.checkAuthenticated = (req, res, next) => {
//     if (req.isAuthenticated()) {
//         return next()
//     }

//     res.redirect('/auth/login')
// }

// exports.checkNotAuthenticated = (req, res, next) => {
//     if (req.isAuthenticated()) {
//         return res.redirect('/')
//     }
//     next() 
// }

// route middleware to make sure
exports.isLoggedIn = (req, res, next) => {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
      return next();
    
    // if they aren't redirect them to the home page
    res.redirect('/');
    }