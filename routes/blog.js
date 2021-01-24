const express = require('express');
const { create, getAll,getById,editOne,deleteOne ,gets,getblog,getblogauthor,gettitle} = require('../controller/blog');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');



//router get all blog
router.get('/', async (req, res, next) => {
  try {
    const blo= await gets();
    res.json(blo);
  } catch (e) {
    next(e);
  }
});









router.use (authMiddleware);

//create new blog
router.post('/', async (req, res, next) => {
  const { body, user: { id } } = req;
    try{
      debugger
    const blogs =await create({ ...body, userId: id });
  res.json(blogs);
  
} catch (e) 
{
  console.log("fff");
    next(e);
  }
});

//get all blogs //to specific user
router.get('/', async (req, res, next) => {
  const { user: { id } } = req;
  console.log(id);
  try {
    const blo = await getAll({ userId: id });
    res.json(blo);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

//localhost:9000/blogs
//get specific blog using id //search by id
router.get('/:id', async (req, res, next) => {
 const { params : { id } } = req; // req have params here is id 
  try {
    const blo = await getById(id);
    res.json(blo);
  } catch (e) {
    next(e);
  }
});




//edit to one blog

router.patch('/:id', async (req, res, next) => {
  const { params : { id }, body } = req; // req have params here is id to able to edit in body
   try {
     const blo = await editOne(id, body);
     res.json(blo);
   } catch (e) {
     next(e);
   }
 });



 //delete by id
 router.delete('/:id', async (req, res, next) => {
  const { params : { id } } = req; 
  try {
    const blo = await deleteOne(id);
    res.json(blo);
  } catch (e) {
    next(e);
  }
});



//search by author
router.get('/author/:userId',async(req,res,next)=>
{
  const { params: {userId}}=req;
try{
  console.log(userId);
  const blo =await getblogauthor(userId);
  res.json(blo);

}catch(e){
  next(e);
}
});


// search by title
router.get('/title/:title', async (req, res, next) => {
  const { params: {title} } = req;
  try {
   // debugger
    console.log(title);
    const blogs = await gettitle(title);
    res.json(blogs);
  } catch (e) {
    next(e);
  }
});


//search by tag
router.get('/tags/:tag',async(req,res,next)=>
{
  const { params: {tag}}=req;
try{
  console.log(tag);
  const blo =await getblog(tag);
  res.json(blo);

}catch(e){
  next(e);
}
});





module.exports = router;