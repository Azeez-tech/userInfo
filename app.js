const express = require('express')
const PORT = process.env.PORT || 9000
const mongoose = require('mongoose')
const routers = require('./routers/users')
const app = express()

mongoose.connect('mongodb://127.0.0.1/Registered_Users')
.then(()=>{
  console.log('connection to mongodb successfull');
  
}).catch((error)=>{
  console.log(error);
  
})

app.use('/api/users', routers)

app.listen(PORT, ()=>{
  console.log(`Server is listening at ${PORT}`);
  
})


