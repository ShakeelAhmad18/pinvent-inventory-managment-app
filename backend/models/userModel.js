const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')

const userSchema=mongoose.Schema(
    {
      name:{
        type:String,
        required:[true,"Please add a name"]
      },
      email:{
        type:String,
        required:[true,"Please add a Email"],
        unique:true,
        trim:true,
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please Enter a valid Email"
        ]
      },
      password:{
        type:String,
        required:[true,'Please Enter a Password'],
        minLength:[8,'Password must contain a 8 Character'],
        //maxLength:[23,'Password does not contain a more than 23 charactor']
      },
      photo:{
        type:String,
        required:[true,'Please Add a Photo'],
        default:'https://i.ibb.co/4pDNDk1/avatar.png'
      },
      phone:{
        type:String,
        default:'+92'
      },
      bio:{
        type:String,
        maxLength:[
            250,'Bio must  not be more than 250 character'
        ],
        default:'Bio'
      }
    },{
        timestamps:true
    }
)
//bcrypt password before saving to DB
 userSchema.pre("save",async function(next){
   if(!this.isModified('password')){
    next()
   }

    const salt=await bcrypt.genSalt(10)
    const hashedPassowrd=await bcrypt.hash(this.password,salt)
    this.password = hashedPassowrd;
    next()
})

 const User=mongoose.model('User',userSchema)
 module.exports=User;