const express = require('express');
// const Blog = require('./models/Blog');

const mongoose = require('mongoose');

const routes = require('./routes');
const app = express();
mongoose.connect('mongodb://localhost:27017/ne', { useUnifiedTopology: true });


app.use(express.json());//read body and convert it from string to object
app.use('/', routes);

app.use('*', (req, res, next) => {//if no route is match come here
    res.status(404).json({ err: 'NOT_FOUND' });
  });

//if any error happen to server come here
//middle ware error handlor
app.use((err, req, res, next) => {
    
   // res.send(err);
   console.error(err);
   if (err instanceof mongoose.Error.ValidationError) {
     return res.status(422).json(err.errors);}
// there is daplication
     if (err.code === 11000) {
      res.status(422).json({ statusCode: 'ValidationError', property: err.keyValue });
    }

    if (err.message === 'UN_AUTHENTICATED') {
      res.status(401).json({ statusCode: 'UN_AUTHENTICATED' });
    }
    res.status(503).end();

  });







const { PORT =6000 } = process.env;
app.listen(PORT, ()=> {
    console.log(' app is ready at port',PORT)
})