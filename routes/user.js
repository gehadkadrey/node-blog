const express = require('express');
const { create , login, getAll,editOne,getById,deleteOne,addfollow,removefollow} = require('../controller/user');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
// create new user//registeration
router.post('/', async (req, res, next) => {
    const { body } = req;
    try {
      const user = await create(body);
      res.json(user);
    } catch (e) {
      next(e);
    }
  });



//login
router.post('/login', async (req, res, next) => {
  const { body } = req;
  try {
    const user = await login(body);
    res.json(user);
  } catch (e) {
    next(e);
  }
});



//getall //register user
router.get('/', async (req, res, next) => {
  try {
    const users = await getAll();
    res.json(users);
  } catch (e) {
    next(e);
  }
});





//edit by id //edit in one //update
router.patch('/:id', async (req, res, next) => {
  const { params: { id }, body } = req;
  try {
    const users = await editOne(id, body);
    res.json(users);
  } catch (e) {
    next(e);
  }
});


//delete by id
router.delete('/:id', async (req, res, next) => {
  const { params : { id } } = req; 
  try {
    const user= await deleteOne(id);
    res.json(user);
  } catch (e) {
    next(e);
  }

});

 router.use (authMiddleware);

//get by id
router.get('/:id', async (req, res, next) => {
  const { params : { id } } = req; // req have params here is id 
   try {
     const user = await getById(id);
     res.json(user);
   } catch (e) {
     next(e);
   }
 });



//following

router.post('/follow/:targetid', async (req, res, next) => {
  const { params: { targetid },user: { id }  } = req;
  try {
    const users = await addfollow( targetid, id);
    res.json(users);
  } catch (e) {
    next(e);
  }
});


// router.post('/follow/:targetid', async (req, res, next) => {
//   const { params: { targetid },user: { id }  } = req;
//   try {
//     const users = await addfollow( targetid, id);
//     res.json(users);
//   } catch (e) {
//     next(e);
//   }
// });

//unfollow 

router.post('/unfollow/:targetid', async (req, res, next) => {
  const { params: { targetid },user: { id }  } = req;
  try {
    const unfull = await removefollow( targetid, id);
    res.json(unfull);
  } catch (e) {
    next(e);
  }
});



  
  module.exports = router;