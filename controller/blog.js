const Blog =require('../models/Blog');

// create new blog
const create = (blog) => {
    console.log(blog);
    return Blog.create(blog);
   
}


const gets = () =>Blog.find({}).exec();


//get all blogs
const getAll = (query) =>{
    console.log(query);
  return Blog.find(query).exec();// exec to use promise
}

//get speific blog by id //search by id
const getById = (id) => Blog.findById(id).exec();

//edit by id to specific blog
const editOne = (id, body) => Blog.findByIdAndUpdate(id, body, { new: true }).exec();// find take id of what i need to edit and where we edit we will edit in body .....if we don't write new=true this will return function before edit

//delete by specific id
//const deleteOne =(id) =>Blog.findOneAndDelete(id).exec();
const deleteOne =(id) =>Blog.remove({_id:id});


//search by tag
const getblog=(_tag)=>Blog.find({tags:{$elemMatch:{tag:_tag}}}).exec();

//search by auther
const getblogauthor=(_userId)=>Blog.find({userId:_userId}).exec();


//search by title
const gettitle=(_title) =>Blog.find({title:_title}).exec();


module.exports ={
    create, getAll,getById,editOne , deleteOne,gets ,getblog,getblogauthor,gettitle
}