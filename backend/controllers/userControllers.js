const asyncHandler = require("express-async-handler");
const User=require('../models/userModel');
const generateToken=require('../config/generateToken');

//@description     Get or Search all users
//@route           GET /api/user?search=
//@access          Public
const allUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
  
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);
  });

const registerUser = asyncHandler(async (req,res)=>{
    const {name,email,password}=req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please Enter all the fields");
    }

    const userExists= await User.findOne({email})

    if(userExists){
        res.status(400);
        throw new Error("User Already Exists");
    }

    const user= await User.create({
        name,
        email,
        password,
    });

    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            pic:user.pic,
            token:generateToken(user._id) /// When it registers new user i want it to create a JWT Token
            // JWT helps us to authorize the user in our backend. JWT will help to verify the user at allow/give him access to the data he wants 
        })
    }
    else{
        res.status(400);
        throw new Error("Failed to create the User");
    }
});
//Login API
const authUser=asyncHandler(async (req,res)=>{
    const {email,password}=req.body;

    const user =await User.findOne({email});
    if(user &&(await user.matchPassword(password))){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            pic:user.pic,
            token:generateToken(user._id)
        })
    }
    else {
        res.status(401);
        throw new Error("Invalid Email or Password");
    }
})

module.exports={registerUser,authUser,allUsers};