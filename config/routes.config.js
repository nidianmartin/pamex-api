const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const coinController = require('../controllers/coin.controller')
const coinDayController = require('../controllers/coinDay.controller')
const upload = require('./cloudinary.config');

module.exports = router;

router.get('/currencies', coinController.getCoin)
router.get('/coin-day', coinDayController.getCoinDay)

router.post('/users', authMiddleware.isNotAuthenticated, upload.single('avatar'), userController.create)
router.post('/login', authMiddleware.isNotAuthenticated, userController.doLogin)
router.post('/logout', authMiddleware.isAuthenticated, usersController.logout)
