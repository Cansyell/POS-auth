const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
// const { protect } = require('../middleware/authMiddleware');

router.post('/register', authController.register);
// router.post('/login', authController.login);
router.post('/login', (req, res, next) => {
  console.log('Login payload:', req.body);
  authController.login(req, res, next);
});
// Add the logout route - requiring authentication
router.post('/logout', authController.logout);
router.get('/getUser', authController.getUser);

module.exports = router;