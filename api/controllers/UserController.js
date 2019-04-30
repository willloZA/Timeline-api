/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	


  /**
   * `UserController.login()`
   */
  login: function (req, res) {
    console.log(req.session)
    if (req.session && req.session.me) {
      console.log('session exists')
      return res.ok({ message: `already logged in`})
    } else {
      return res.login({
        email   : req.param('email'),
        password: req.param('password')
      });
    }
  },


  /**
   * `UserController.logout()`
   */
  logout: function (req, res) {
    // "Forget" the user from the session.
    // Subsequent requests from this user agent will NOT have `req.session.me`.
    req.session.me = null;
    return res.ok({ message: 'Logged out successfully.' });
  },


  /**
   * `UserController.signup()`
   */
  signup: function (req, res) {

    User.create(req.params.all())
      .then((user) => {

      // Go ahead and log this user in as well.
      // We do this by "remembering" the user in the session.
      // Subsequent requests from this user agent will have `req.session.me` set.
      req.session.me = user.id;
      sails.hooks.filter.user(user);
      console.log(`User ${user.firstName} created!`)
      return res.ok({ user: user, message:'Signup successful!' });
    })
    .catch((err) => {
      return res.negotiate(err);
    });
  }
};
