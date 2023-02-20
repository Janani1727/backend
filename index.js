const express=require("express")
const {connection} =require("./db")
const cors=require("cors")
const app=express()

app.use(express.json())
app.use(cors())
const {auth} =require("./middlewares/authentication.middleware")

const {userRouter} =require("./routes/User.routes")
const {NoteRouter} =require("./routes/note.route")


app.get("/",(req,res)=>{
    res.send("home")
} )


app.use("/users",userRouter)
app.use(auth)
app.use("/notes",NoteRouter)
app.listen(8080,async()=>{

    try {
        await connection
        console.log("connected to db")
    } catch (err) {
        console.log(err.message)
    }
    console.log("hi there 8080")
})