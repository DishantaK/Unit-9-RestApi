const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models').User;
const { authenticateUser } = require('../auth');

//  return all properties and values for the currently authenticated User along with a 200 HTTP status code.
router.get('/', authenticateUser, async function(req, res) {
    
    const user = req.currentUser;
    if(user){
    res.status(200).json({
        id:user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress
    });
} else {
    res.status(404).json({message: 'No user found'});
}
    // finding the user and returning 404 or 200
});

// create a new user, set the Location header to "/", and return a 201 HTTP status code


router.post('/', async function(req, res) {

      // if any is field null, then reject
      // hash password req.body.password 

    try {
        const user = req.body;
        const password = req.body.password;
         
        if(password){
            req.body.password =  bcrypt.hashSync(req.body.password, 10);
        }
     
        await User.create(user);
        res.status(201).location("/");
        } catch (error) {
            if(error.name === "SequelizeValidationError") { 
                res.status(400).json(error.errors)
              } else {
                throw error; 
              }  
          }
    // posting the user, then go home or catching and displaying the error
});

module.exports = router;