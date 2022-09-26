const express = require('express')
const routes = express.Router(); 
const {signup,signin,getFriendList} = require('../../controler/auth')
const {validateSignInRequest,validateSignupRequest, isRequestValidated} =require('../../validator');
const {requireSignIn} =require('../../commonMiddleware')

// first will be arry then fuction and then loagic

routes.post('/signup',validateSignupRequest,isRequestValidated,signup)

routes.post('/signin', validateSignInRequest,isRequestValidated,signin)

routes.get('/friendlist',requireSignIn,getFriendList)

module.exports = routes;