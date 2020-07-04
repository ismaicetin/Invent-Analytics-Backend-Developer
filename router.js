var express = require('express');
var router = express.Router();  
 
const userController = require("./controllers/userController"); 
const bookController = require("./controllers/bookController"); 
 
router.get      ('/users',                           userController.list)     
router.get      ('/users/:id',                       userController.getById)        
router.post     ('/users',                           userController.create)  
router.put      ('/user/:id',                        userController.update)     
router.delete   ('/user/:id',                        userController.delete) 
router.post     ('/users/:id/borrow/:bookId',        userController.borrow)   
router.post     ('/users/:id/return/:bookId',        userController.return)   

 
router.get      ('/books',                          bookController.list)     
router.get      ('/books/:id',                       bookController.getById)        
router.post     ('/books',                           bookController.create)   


 

router.get      ('/', (req, res)=>{ return "Destek için 0531 321 1110 ara "})   
module.exports = router;
