const express = require("express");
const router = express.Router();

const credential = {
  email: "admin@gmail.com",
  password: "admin123",
};

// login user
router.post('/login', (req, res) => {
  if (req.body.email === credential.email && req.body.password === credential.password) {
    req.session.user = req.body.email; // Set the 'user' property in the session object
    res.redirect('/route/dashboard'); // Redirect to the dashboard route
  } else {
    res.end("Invalid Username");
  }
});

//route for dashboard

router.get('/dashboard',(req,res)=>{
    if(req.session.user){
        res.render('dashboard',{use:req.session.user})
    }else{
        res.send("Unauthorized User")
    }
})

//route logout
router.get('/logout',(req,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("Error")
        }else{
            res.render('base', {title:"Express", logout:"logout Successfully"})
        }
    })
})

module.exports = router;