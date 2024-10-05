const mongoose = require('mongoose')

const bookShema = new mongoose.Schema({
  title:{
    type: String,
    require:true
  },
  publishedDate : {
    type : String,
    require:true
  },
  genre:{
    type:String,
    require:true
  },
  pages:{
    type:Number,
    require:true
  },
  authorId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Author'
  }
})
const AuthorShema = new mongoose.Schema({
  name:{
    type: String,
    require:true
  },
  birthday : {
    type : String,
    require:true
  },
  nationality:{
    type:String,
    require:true
  },
  bookId:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Book'
  }]
})
let Book = mongoose.model("Book",bookShema);
let Author = mongoose.model("Author",AuthorShema);

module.exports = {Book,Author}