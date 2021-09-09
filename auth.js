'use strict';

const auth = require('basic-auth');
const { User } = require('./models');
const bcrypt = require('bcryptjs');

exports.authenticateUser = async (req, res, next) => {
    // Parse the user's credentials from the Authorization header.
    const credentials = auth(req);
    let message;

    if (credentials) {
        const user = await User.findOne({ where: {username: credentials.name} });
        if (user) {
            const authenticated = bcrypt
              .compareSync(credentials.pass, user.confirmedPassword);
            if (authenticated) {
              console.log(`Authentication successful for username: ${user.username}`);
              // Store the user on the Request object.
              req.currentUser = user;
            }else {
                message = `Authentication failure for username: ${user.username}`;
              }
            } else {
              message = `User not found for username: ${credentials.name}`;
            }
          } else {
            message = 'Auth header not found';

          }
          
            if (message) {
              console.warn(message);
              res.status(401).json({ message: 'Access Denied' });
            } else {
              next();
            }
   
    };