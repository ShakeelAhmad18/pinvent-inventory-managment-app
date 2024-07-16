const mongoose=require('mongoose')
const dotenv=require('dotenv').config()
const bodyParser=require('body-parser')
const express=require('express')
const cors=require('cors')
const userRoute=require('./routes/userRoute')

const app=express();

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json())

//routes middleware

app.use('/api/users',userRoute)


   mongoose.connect(process.env.MONGO_URI).then(()=>{

    app.get('/',(req,res)=>{
        res.send('Home Page')
      })

   })


const PORT = 5000;





app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`)
})