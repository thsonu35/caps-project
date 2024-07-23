const express = require('express');
const { registerUser,nameuser,updatePassword, loginUser,allUsers } = require('../controller/user');
const {auth} = require('../middleware/auth')
// const { verify } = require('jsonwebtoken');

const router = express.Router();


// http://localhost:3000/api/auth/register
router.post('/register' , registerUser);


// http://localhost:3000/api/auth/login
router.post('/login',  loginUser);


// http://localhost:3000/api/auth/all
router.get ('/all',auth,allUsers);


// http://localhost:3000/api/auth/username
router.get ('/username', nameuser);
 


// http://localhost:3000/api/auth/updatepassword
router.put ('/updatepassword',auth, updatePassword)


module.exports = router;
