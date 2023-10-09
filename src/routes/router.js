const express = require('express');
const router = express.Router()
const { AuthEndpoint } = require('../service/auth/endpoint');
const { ImgEndpoint } = require('../service/image/endpoint')

router.get('/auth/google',new AuthEndpoint().authGoogle)
router.get('/auth/google/callback', new AuthEndpoint().authCallback)
router.get('/profile', new AuthEndpoint().profile)
router.get('/auth/google/logout',new AuthEndpoint().logout)
  

router.get('/', (req, res) => {
    return res.render('../../src/view/index.ejs',{ user: req.user })
})

module.exports = router;