const router=require('express').Router()
const {signUpController,logInController,refreshTokenController} =require('../controllers/authController')

router.post('/signup',signUpController)
router.post('/login',logInController)
router.post('/refresh',refreshTokenController)
module.exports=router
