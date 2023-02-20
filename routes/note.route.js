const express=require("express")
const jwt=require("jsonwebtoken")
const {NoteModel}=require("../model/note.model")
const NoteRouter=express.Router()

NoteRouter.get("/",async(req,res)=>{
    const token = req.headers.authorization
    if(token){
     jwt.verify(token,"masai",async (err,decoded)=>{
      const Id = decoded.userId; 
      const notes = await NoteModel.find({userId : Id})
      res.send(notes) 
     })  
  
    }
    else{
        res.send("Please Login")
     } 
 
})

NoteRouter.post("/create",async(req,res)=>{
    const payload=req.body
    const note=new NoteModel(payload)
    await note.save()
    res.send({"msg":"notes created"})
})


// NoteRouter.delete("/delete/:id",async(req,res)=>{
//    const noteId=req.params.id
//    await NoteModel.findByIdAndDelete({_id:noteId})
//     res.send({"msg":"notes deleted"})
// })


// NoteRouter.patch("/update/:id",async(req,res)=>{
//     const noteId=req.params.id
//     await NoteModel.findByIdAndUpdate({_id:noteId})
//     res.send("notes updated")
// })

NoteRouter.patch("/update/:id", async(req,res)=>{
    const payload = req.body
    const id = req.params.id
    const note = await NoteModel.findOne({"_id":id})
    const userID_in_note=note.userID
    const userID_making_req=req.body.userID
    try{
       if(userID_making_req!==userID_in_note){
           res.send({"msg":"You are not authorized"})
       }else{
           await NoteModel.findByIdAndUpdate({"_id":id},payload)
           res.send("Updated the note")
       }
    
    }catch(err){
       console.log(err)
       res.send({"msg":"Something went wrong"})
    }
    
   })

   NoteRouter.delete("/delete/:id", async(req,res)=>{
    
    const id = req.params.id
    const note = await NoteModel.findOne({"_id":id})
    const userID_in_note=note.userID
    const userID_making_req=req.body.userID
    try{
       if(userID_making_req!==userID_in_note){
           res.send({"msg":"You are not authorized"})
       }else{
           await NoteModel.findByIdAndDelete({"_id":id})
           res.send("deleted the note")
       }
    
    }catch(err){
       console.log(err)
       res.send({"msg":"Something went wrong"})
    }
    
   })


module.exports={NoteRouter}