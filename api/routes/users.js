const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../model/User");
const { verifyToken } = require("../verifyToken");


router.post("/favPosts/", verifyToken, async(req, res)=>{
    const postId = req.body.postId;

    // try {

    //     const favposts = await User.findOneAndUpdate({_id:userId},{
    //         $push:{favPosts: postId}
    //     })
    //     res.status(200).json(favposts);
    // }catch(err){
    //     res.status(500).json(err);
    // }       
    
    try {
        const user = await User.findById(req.userId);
        console.log(user);
         if(user.favPosts.includes(postId)){
         
            let index = user.favPosts.indexOf(postId);
            console.log(index);
          await  user.favPosts.splice(index, 1);
         } else {
          await  user.favPosts.push(postId);
         }
         await user.save();
         return res.status(200).json(user.favPosts);
  
        }catch(err){
        res.status(500).json(err);
    }

})

router.get("/favPosts", verifyToken, async(req, res)=>{
    
try{
    const user = await User.find({_id:req.userId}).populate("favPosts");
    console.log(user);
    console.log('data',user[0].favPosts)
    return  res.status(200).json(user[0].favPosts);
    // for(let i =0; i<user?.favPosts?.length; i++){
    //         const favs = await User.findById(userId).populate("favPosts");
    //         console.log(favs);
    //         return favs
    // }
    
}catch(err){    
  return  res.status(500).json(err)
}

})


module.exports = router;


