const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();


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
            user, {
            session: false
          },
            async (error) => {
              if (error) return next(error);

              const body = {
                _id: user._id,
                email: user.email
              };
              const token = jwt.sign({
                user: body
              }, 'TOP_SECRET', {
                expiresIn: '1d'
              });
              console.log(token)

              return res.json({
                token,
                expiresIn: 86400
              });
            }
          );
        } catch (error) {
          return next(error);
        }
      }
    )(req, res, next);
  }
);
router.post(
  '/signup',
  passport.authenticate('signup', { session: false }),
  async (req, res, next) => {
    console.log('>>>>')
    console.log(req)
    res.json({
      message: 'Signup successful',
      user: req.user
    });
  }
);

module.exports = router;
