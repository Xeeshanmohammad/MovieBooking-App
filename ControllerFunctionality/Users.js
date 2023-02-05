const express = require("express");
const router = express.Router();
const User = require('../Models/UserModels')

const {verifyToken, verifyUser, verifyAdmin} = require('../utils/token')

// router.get('/checkAuthentication', verifyToken, async(req,res,next)=>{
//     res.send('User, you r logged in!')
// })

// router.get('/checkUser', verifyUser, async(req,res,next)=>{
//     res.send('User, You are allow to delete your account!')
// })

// router.get('/checkAdmin', verifyAdmin, async(req,res,next)=>{
//     res.send('Admin, You are allow to delete all account!')
// })


router.put('/updateUser' ,verifyUser,async (req,res,next)=>{
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
})

router.delete('/deleteUser', verifyUser, async (req,res,next)=>{
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    next(err);
  }
})

router.get('/getUsers/:id', verifyUser, async (req,res,next)=>{
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
})

router.get('/getUsers', verifyAdmin,async (req,res,next)=>{
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
})

module.exports = router;
