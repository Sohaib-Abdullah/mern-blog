const router = require("express").Router();
const Favourite = require('../model/Favourite');
const Post = require("../model/Post");

router.post("/favouritepost/:post_id", async(req, res)=>{
    const post_id = req.params.post_id;
    console.log(post_id);
    const favouritesposts = new Favourite({
        userId: req.body.userId,
    })
    console.log("iam", favouritesposts);
    try {

        const newfavouriteposts = await favouritesposts.save();
        console.log(newfavouriteposts._id);
        try {
            
            // const favpostss=     await Post.findByIdAndUpdate(post_id,{
            //     $push: { favPosts: post_id},
            // })
                const favpostss = await Post.find(post_id).populate('fav_id');
            console.log("fasf", favpostss);
            
        }catch(err){

        }
        return res.status(200).json(newfavouriteposts);
    }catch(err){
        return res.status(500).json(err);
    }
})



// router.post("/favposts", async(req, res)=>{
//     const favdata = await Favourite.find({_id:req.body.favid}).populate('fav_id');
//     return res.status(200).json(favdata);
// })

module.exports = router;