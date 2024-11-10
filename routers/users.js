const express = require('express')
const { User, validate } = require('../schemas/userSchema')
const routers = express.Router()


routers.use(express.json())
routers.use(express.urlencoded({extended: true}))

routers.get('/', async (req, res)=>{
  let users = await User.find()
  res.status(200).json(users)
})

routers.get('/:id', async (req, res)=>{
  const user = await User.findById(req.params.id)
  if(!user){
    res.status(404).json('User not found')
    return
  }
  res.status(200).json(user)
})

routers.post('/post', async (req, res)=>{
  const {error} = validate(req.body)
  if(error){
    res.status(400).json(error.details[0].message)
    return
  }
  const user = new User({
    userName: req.body.userName,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
    email: req.body.email
  })
  await user.save()
  res.status(200).json(user)
})

routers.put('/update/:id', async (req, res)=>{
  const {error} = validate(req.body)
  if(error){
    res.status(400).json(error.details[0].message)
    return
  }
  const user = await User.findByIdAndUpdate(req.params.id,{
     userName: req.body.userName,
     firstName: req.body.firstName,
     lastName: req.body.lastName,
     age: req.body.age,
     email: req.body.email
  },{new: true})
  if(!user){
    res.status(404).json('User not found')
    return
  }
  await user.save()
  res.status(200).json('Account updated successfully')
})

routers.delete('/delete/:id', async (req, res)=>{
  const user = await User.findByIdAndDelete(req.params.id)
  if(!user){
    res.status(404).json('User not found')
    return
  }
  res.status(200).json('Account deleted successfully')
})

module.exports = routers