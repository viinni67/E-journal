const express = require('express');
const router = express.Router();
const User = require('../models/User')
const jwt=require('jsonwebtoken');
const jwt_sec='berserk_gym_motivation'
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const getuser=require('../middleware/getuser');

//route 1 user id create !!


router.post('/createuser', [
    body('email', 'enter a valid email ').isEmail(),
    body('name', 'enter a valid name').isLength({ min: 4 }),
    body('password', 'enter a valid password').isLength({ min: 10 })

], async (req, res) => {
    const error = validationResult(req);
    let success=false;
    if (!error.isEmpty()) {
        return res.status(400).json({success, error: error.array() });
    }
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({success, error: "sorry email already exist" })
        }
        //hashing the passwords
       
        const salt= await bcrypt.genSalt(10);
        const seqpass= await bcrypt.hash(req.body.password,salt);

        //creating user ids
        user = await User.create({
            name: req.body.name,
            password: seqpass,
            email: req.body.email
        });
       
         const data={
             user:{
                 id: user.id
           }
        }
        // //used for no login (token systemmm)
         const token = jwt.sign(data, jwt_sec);
         success=true;
         res.json({success,token});
       
    } catch (error) {
        console.log(error.message);
        res.status(500).send("some error :")
    }
})
//authneticate the user (login) route 2
router.post('/login', [
    body('email', 'enter a valid email ').isEmail(),
    body('password', 'password cannot be blank').exists(),


], async (req, res) => {
    let success=false;
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    const {email,password}=req.body;
    try{
        let user= await User.findOne({email})
        if(!user){
            return res.status(400).json({success,error:"may be email or password is wrong "})
        }
        const verification= await bcrypt.compare(password,user.password);
        if(!verification){
            
            return res.status(400).json({success,error:"may be email or password is wrong"})

        };
        const data={
            user:{
                id:user.id
            }
        }
        const token = jwt.sign(data, jwt_sec);
        success=true;
        res.json({success,token});


    }catch(error){
        console.error(error.message);
        res.status(400).send("internal error")


    }



});

//route 3 getting details using post /api/auth/getuser login required
router.post('/fetch',getuser,async (req,res)=>{
try {
    let userId=req.user.id;
    const user1=await User.findById(userId).select('-password');
    res.send(user1);
    
} catch (error) {
        console.error(error.message);
        res.status(500).send("wrong token")


    
    
}
})
//route 4 delete the user "api/auth/deleteUser"(login required);
router.delete('/deleteUser/:id',getuser,async (req,res)=>{
    try {
        let userId=req.params.id;
        let user1=await User.findById(userId);
        if(!user1){
            return res.status(404).send("not found")
        }
        user1=await User.findByIdAndDelete(userId)
        res.send("user has been deleted : )")
        
    } catch (error) {
            console.error(error.message);
            res.status(500).send("wrong credentials")
    
    
        
        
    }
    })

module.exports = router;
