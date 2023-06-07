const express=require('express');
const userController=require('../controllers/userController')
const router = express.Router();
router.post('/signup',userController.signup)
router.post('/login',userController.login)
router.post('/forgotpassword',userController.forgotpassword)
router.get('/getallusers',userController.getAllUsers)
router.put('/update/:id',userController.updateUserById)

module.exports=router