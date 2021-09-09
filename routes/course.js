const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { Course, User } = require('../models');
const { authenticateUser } = require('../auth');
// return all courses including the User associated with each course and a 200 HTTP status code.

router.get('/', async function(req, res) {
    const courses =  await Course.findAll();
    res.status(200).json(courses);
});

// return the corresponding course including the User associated with that course and a 200 HTTP status code.
router.get('/:id', async function(req, res) {
    const course = await Course.findByPk(req.params.id);
    if(course === null) {
        res.status(404);
      } else {
        res.status(200).json(course);
      }
   
});

// create a new course, set the Location header to the URI for the newly created course, and return a 201 HTTP status code
router.post('/', authenticateUser, async function(req, res) {

 // if title and description null, reject
    try{
        let newCourse = await Course.create(req.body);
        console.log(newCourse)
        res.status(201).location(`/${newCourse.id}`)
    } catch (error) {
        if(error.name === "SequelizeValidationError") { 
            let newCourse = await Course.create(req.body);
            res.status(400).json(error.errors)
          } else {
            throw error; 
          }  
    }
});

// update the corresponding course and return a 204 HTTP status code 
router.put('/:id', authenticateUser, async function(req, res) {
    const course = await Course.findByPk(req.params.id);
   // if title and description null, reject
    if(course === null) {
        res.status(404).redirect('/');
      } else {
        try{
        await course.update(req.body);
        res.status(204).json(course); 
        } catch(error) {
            if(error.name === "SequelizeValidationError") { 
                await course.update(req.body);
                res.status(400).json(error.errors)
              } else {
                throw error; 
              }  
        }
      }
});

// delete the corresponding course and return a 204 HTTP status code 
router.delete('/:id',  authenticateUser, async function(req, res) {
    const course = await Course.findByPk(req.params.id);

    if(course === null) {
        res.status(404);
      } else {
        await course.destroy();
        res.status(204).redirect('/'); 
      }
});


router.get('*', async function(req, res) {
    res.status(404);
  });


module.exports = router;