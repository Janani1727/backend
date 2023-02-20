const express=require("express")

const {UserModel} =require("../model/user.model")

const userRouter=express.Router()

const jwt=require("jsonwebtoken")

const bcrypt =require("bcrypt")

userRouter.post("/register", async(req,res)=>{
const {name,email,pass}=req.body
try {
   
 bcrypt.hash(pass,5,async(err,hash)=>{
      if(err) {
        res.send(err.message)
      }else{
        const user=new UserModel({name,email,pass:hash})
        await user.save()
        res.send({"msg":"user has been registered"})
      }
 })
   

} catch (err) {
  res.send({"msg":"something went wrong","err":err.message})
  }
  

})

userRouter.post("/login",async(req,res)=>{
  
  const {email,pass}=(req.body)
  try {
    const user= await UserModel.find({email})
   
    if(user.length>0){
        bcrypt.compare(pass,user[0].pass,function(err,result){
               if(result){
                let token=jwt.sign({userID:user[0]._id},"masai")
                res.send({"msg":"logged in","token":token})
            
               }else{
                res.send({"msg":"something went wrong","err":err.message})

               }
        })
       
    }else{
        res.send({"msg":"wrong credentials"})
     
    }
  } catch (error) {
    res.send({"msg":"something went wrong","err":err.message})

  }
   
    
       
    })
    
    module.exports={userRouter}
