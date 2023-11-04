const router=require('express').Router()
const {signUpController,logInController} =require('../controllers/authController')

router.post('/signup',signUpController)
router.post('/login',logInController)

module.exports=router
