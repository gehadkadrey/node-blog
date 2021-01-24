const mongoose = require("mongoose");
const { Schema } = mongoose;
const blogSchema = new Schema({
    title:{
        type:String,
        maxLength:255,
         required:true,
    },
  body:{
        type:String,
        maxLength:800,
         required:true,
    },
    tags:[{ tag:String}],
//    author:{
//         type:String,
//         maxLength:255,
//         // required:true,
//     }, 
   createdAt:{
       type:Date,
       default: Date.now(),
   },

   userId: {
    type:String,
    ref: 'User',
  },
  
  photo: String,


})
module.exports=mongoose.model('Blog',blogSchema)