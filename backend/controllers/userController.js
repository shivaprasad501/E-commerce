
import usermodel from "../models/usermodel.js"
import bcrypt from '@node-rs/bcrypt';
import jwt from 'jsonwebtoken'
import validator from 'validator'

//creating jwt  token
 const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{ expiresIn: '7d' })
 }

//Route for user login
const loginUser=async(req,res)=>{
   try {
    const {email,password}=req.body
    //finding user
    const user= await usermodel.findOne({email})
    if(!user){
        return res.json({success:false,msg: "User not found"})
    }
    const isMatch =await bcrypt.verify(password,user.password)

    if(isMatch){
        const token =createToken(user._id)
        res.json({
             success:true,token
        })
    }else{
        res.json({
            success:false,msg:"invalid credentials "
       })
    }
    
   } catch (error) {
    console.log(error);
        res.json({success:false,msg:error.message})
        
    
   }

}
//Route for user register
const registerUser=async(req,res)=>{
    try {
        const {name ,email,password}=req.body
        //checking user already exit are not
        const exists =await usermodel.findOne({email})
        if(exists){
            return res.json({success:false,msg:"user already exists"})
        }
        //validating email and password
        if(!validator.isEmail(email)){
            return  res.json({success:false,msg:"please enter valid email"})
        }
        if(password.length < 8){
           return res.json({success:false,msg:"please enter strong password"})
        }
    //hasing user password
    const hashpassword= await bcrypt.hash(password,10)
    //creating user
    const newUser=new usermodel({
        name,
        email,
        password:hashpassword
    })
    const user=await newUser.save()

    const token =createToken( user._id)
    res.json({
         success:true,token
    })

        
    } catch (error) {
        console.log(error);
        res.json({success:false,msg:error.message})
        
        
    }

}
//Route for adminlogin
const adminUser=async(req,res)=>{
    try {
        const{email,password}=req.body
  if(email===process.env.ADMIN_EMAIL&&password===process.env.ADMIN_PASSWORD){
    const token=jwt.sign(email,process.env.JWT_SECRET,{ expiresIn: '7d' })
    res.json({success:true,token})
  }else{
    res.json({success:false,msg:"invalid credentials"})
  }

    } catch (error) {
        console.log(error);
        res.json({success:false,msg:error.message})
        
        
    }

}
export{loginUser,registerUser,adminUser}