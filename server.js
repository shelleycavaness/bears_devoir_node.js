//server.js'
//basic set up================================================ 
//packages
const express =require('express'); //calls express
const app = express();  //  define the use of express
const bodyParser = require('body-parser');  //in the place of the frontend, simualtor
const mongoose =  require('mongoose');

const Bear = require("./app/models/bear")
//mogo server
mongoose.connect("mongodb://localhost:27017/bearsdb");

//configure the body parser- get the numbers or strings from the database 
//and show them in the pseudo html like postman.
app.use(bodyParser.urlencoded({extended:true})); 
app.use(bodyParser.json()); //tells bodyParse how to read json


const port = process.env.PORT || 3000  //set port, the OR for security reasons 
//don't ever write your keys or ports in clear hide them in an environment

//Routes for our API
//============================================
const router = express.Router()// method of Express (route instance de Route)

//Middleware
router.use((req, res, next) => {  
    console.log('this is the middleware');
    next() //in case something goes wrong
}); //test a request
//=================================
router.route("/bears")

// creation of a bear with the method Post (http://localhost:3000/api/bears)
    .post((req, res) => {
        const bear = new Bear() //creates a new instance of the Bear model (constructor)
        bear.name = req.body.name //set the bears name(comes from the request)
        bear.save((err) =>{
            if(err){
                res.send(err)
            }
            else {
                res.json({message: "bear created!"})
            }
        })     
    })
      
//method to see all the bears
    .get((req, res) => {
        Bear.find((err, bears)=>{
          if(err){
              res.send(err)
          }
          else {
              res.json(bears)
          }
        })  //these are like when you get them from MondoDB
    })
    /*---------------------------------------------------------------------------- */
    // get single bear (item) in /bears/:bear_id
    router.route('/bears/:bear_id')
    .get((req, res) => {
        Bear.findById(req.params.bear_id, (err,bear) => {
            if(err)
                res.send(err)
            res.json(bear)
        })
    })
    .put((req, res) => {
        Bear.findById(req.params.bear_id, (err,bear) => {
            if(err)
               res.send(err)
               bear.name = req.body.name;            
               bear.save((err) => {
                   if(err)
                     res.send(err)
                    res.json({message:"bear updated"});
               })
        })
    })
    .delete((req, res) => {
        Bear.remove({
            _id : req.params.bear_id
        }, (err, bear) => {
            if(err)
                res.send(err)
             res.json({message:"Successfully deleted"})   
        });
     });

router.get('/',(req, res) => {
     res.json({message: "here we go. my first API "})
 } );  


//Register Our Routes
app.use('/api', router);
app.listen(port);
console.log(`magic happens onf Port ${port}`);