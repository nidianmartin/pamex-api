const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const coinController = require('../controllers/coin.controller')
const exchangeController = require('../controllers/exchange.controller')
const coinDayController = require('../controllers/coinDay.controller')
const walletController = require('../controllers/wallet.controller')
const upload = require('./cloudinary.config');

module.exports = router;

router.get('/currencies', coinController.getCoin)
router.get('/coin-day', coinDayController.getCoinDay)
router.get('/exchanges', exchangeController.getExchange)

router.post('/users', authMiddleware.isNotAuthenticated, upload.single('avatar'), userController.create)
router.patch('/users/:id', authMiddleware.isAuthenticated, upload.single('avatar'), userController.update)
router.get('/users/:id', authMiddleware.isAuthenticated, userController.profile)

router.post('/login', authMiddleware.isNotAuthenticated, userController.doLogin)
router.post('/logout', authMiddleware.isAuthenticated, userController.logout)

router.post('/wallet', authMiddleware.isAuthenticated, walletController.new)
router.patch('/wallet-edit', authMiddleware.isAuthenticated, walletController.edit)
