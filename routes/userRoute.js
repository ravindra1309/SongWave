const express=require('express');
const router =express.Router();
const bcrpyt= require('bcryptjs')
const jwt=require('jsonwebtoken')
const authMiddleware =require('../middlewares/authMiddleware');
const User= require('../models/userModels')
router.post('/register',async(req,res)=> 
{
    try{
        const password=req.body.password
        const salt=await bcrpyt.genSaltSync(10);
        const hashedPassword=await bcrpyt.hashSync(password,salt);
        req.body.password=hashedPassword
        const user=new User(req.body);
        const existingUser=await User.findOne({email:req.body.email})
        if(existingUser){
            return res.status(200).send({message:"User already exists", success: false})
        }else
        {
            await user.save();
            return res.status(200).send({message:"User Registration Successfull", success: true})
        }
    }catch(error)
    {
        return res.status(500).send({message:error.message, success: false})
    }
});

router.post('/login',async(req,res)=>
{
    try {
        const user=await User.findOne({email: req.body.email});
        if(!user)
        {
            return res
            .status(200)
            .send({message:"User does not Exist.",success:false})
        }
        const passwordsMAtched=await bcrpyt.compareSync(
            req.body.password,
            user.password
        );
        if(passwordsMAtched)
        {
            const token=jwt.sign({userid:user._id},process.env.SECRET_KEY,{
                expiresIn:'1d'
            });
            return res
            .status(200)
            .send({message:"User Logged In Successfully",success:true,data:token});
        }
        else
        {
            return res
            .status(200)
            .send({message:"Password is Incorrect",success:false});
        }
    } catch (error) {
        return res
        .status.send({message:error.message, success:false})
    }
});

router.post("/get-user-data",authMiddleware,async(req,res)=>
{
    try {
        const user=await User.findById(req.body.userId);
        user.password=undefined;
        return res.status(200).send({
            message:"User data fetched Succesfully",
            success: true,
            data:user,
        });
    } catch (error) {
        return res.status(200).send({message:error.message, success:false});
    }
});
module.exports=router;