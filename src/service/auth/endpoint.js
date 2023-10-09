const passport = require('passport');

class AuthEndpoint {

    constructor() {}

    authGoogle = (req, res) => {
        passport.authenticate('google', {
            scope: ['profile', 'email'],
        })(req, res);
    }

    authCallback = (req, res) => {
        passport.authenticate('google', { failureRedirect: '/' })(req, res, () => {
            res.redirect('/'); 
        });
    }

    profile = (req, res) => {
        res.render('profile', { user: req.user });
    }

    logout = (req, res) => {
        req.logout((error) => {
        if (error) {return next(error)}
        res.redirect('/')
    })
    }
    
}
module.exports = {
    AuthEndpoint
}