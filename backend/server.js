const mongoose=require('mongoose')
const dotenv=require('dotenv').config()
const bodyParser=require('body-parser')
const express=require('express')
const cors=require('cors')
const userRoute=require('./routes/userRoute')
const productRoute=require('./routes/productRoute')
const contactRoute=require('./routes/contactRoute')
const cookieParser=require('cookie-parser')
const path=require('path')

const app=express();

//middleware

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cors({
    origin:['http://localhost:3000','https://pinvent-app.vercel.app'],
    credentials:true
}))

app.use('/uploads', express.static(path.join(__dirname,'uploads')))

//routes middleware

app.use('/api/users',userRoute)
app.use('/api/products',productRoute)
app.use('/api/contactus',contactRoute)


   mongoose.connect(process.env.MONGO_URI).then(()=>{

    app.get('/',(req,res)=>{
        res.send('Home Page')
      })

   })


const PORT = 5000;


app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`)
})




