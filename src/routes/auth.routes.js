const {Router} = require('express');
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

const authRouter = Router();

// /api/auth/login
authRouter.post(
    '/login',
    [
        check('password', 'Password must have at least 8 characters').isLength({min: 8}),
        check('password', 'Password must contain at least 1 number').matches('[0-9]'),
        check('password', 'Password must contain at least 1 uppercase letter').matches('[A-Z]')
    ],
    async (req, res) => {
      try {
          
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Invalid data'
        })
      }
  
      const {login} = req.body;

      res.json({login});
  
    } catch (e) {
      res.status(500).json({ message: 'Something went wrong, try again' })
    }
  });

module.exports = authRouter;