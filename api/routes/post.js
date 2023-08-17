const router = require("express").Router();
const Post = require("../model/Post");

const { verifyToken } = require("../verifyToken");

//Create Post

router.post("/", verifyToken, async (req, res) => {
  console.log("come");
  console.log("xx- body show here", req.body);
  const newPost = new Post(req.body.newPost);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id/like", verifyToken, async (req, res) => {
  try {
    console.log("cone", req.params.id);
    const post = await Post.findById(req.params.id);
    console.log(post);
    if (!post.likes.includes(req.userId)) {
      await post.updateOne({ $push: { likes: req.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.userId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/comments/:id", verifyToken, async (req, res) => {
  const comment = {
    text: req.body.newComment,
    postedBy: req.userId,
  };
  console.log("yahan", comment);
  try {
    console.log(req.params.id);
    const ans = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $push: { comments: comment },
      },
      { new: true }
    ).populate("comments.postedBy", "_id username")
    console.log("not", ans);

    await ans.save();
    return res.status(200).json(ans);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.put("/deletecomment/:id", verifyToken, async (req, res)=>{
    console.log("first");
    const delComment = req.body.deleteCommentId;
    const postId = req.params.id;
    console.log("coom id", delComment);
    console.log("sadf", postId);
    try {
            console.log("kk");
        const comme = await Post.findByIdAndUpdate(postId,
            { $pull: {comments: {_id: delComment}}})
            console.log("dd")
        await comme.save();
       return res.status(200).json(comme);
        }catch(err){
      return res.status(500).json(err);
            
        }
    })

router.put("/replycomment", verifyToken, async (req, res) => {
  // console.log("hello")
  const replyMessage = req.body.reply;
  const postId = req.body.postId;
  const commentId = req.body.commentId;
  const mongoose = require("mongoose");
//   const cId = new mongoose.Types.ObjectId(commentId)
    // console.log("c", cId);
  //   console.log("p", postId);

  try {
        const replyData = {
        userId: req.userId, // Assuming you have a user object available, modify as needed
        message: replyMessage,
      };
    const updatedPost = await Post.findOneAndUpdate(
        { _id: postId, 'comments._id': commentId },
        { $push: { 'comments.$.replies': replyData } },
        { new: true }
      ).populate('comments.postedBy', 'username') // Populate the 'postedBy' field in 'comments' with 'username'
      .populate('comments.replies.userId', 'username'); // Populate the 'userId' field in 'replies' with 'username'
      
      if (!updatedPost) {
        return res.status(404).json({ message: 'Post or Comment not found' });
      }
      
      res.status(200).json(updatedPost);
    //   const as = await Post.findById({_id: postId});
    // var mongoose = require("mongoose");
    // const post = await Post.findById(postId);

    // if (!post) {
    //   return res.status(404).json({ message: 'Post not found' });
    // }

    // Find the comment within the post by its ID
    // const comment = post.comments.id(commentId);
    // console.log(comment)

    // if (!comment) {
    //   return res.status(404).json({ message: 'Comment not found' });
    // }

    // Add the new reply to the comment's replies array
    // const replyData = {
    //     userId: req.userId, // Assuming you have a user object available, modify as needed
    //     message: replyMessage,
    //   };
    // comment.replies.push(replyData).populate("comments.UserId","_id username");

    // Save the updated post
    // const updatedPost = await post.save();

    // res.status(200).json(updatedPost);
    //   console.log(as)
    //   console.log("all", as.comments)
    //   console.log("ss", as.comments[0]);
    //   console.log("id", as.comments[0]._id);

    // const findData = await Post.findById(postId)

    
    // const comnt = findData.comments.find(item => item._id ===  cId)
    
    // console.log('commnet ---> ', comnt)

    // return res.status(200).json(comnt);



    // const comments = [...findData.comments]
   
    // comments[0]['reply'] = "reply" 

    // const abc = {...comments}

    // console.log(comments[0])


    // const comments = findData.comments.map(item => {
        
    //     if (String(item._id) === String(cId)) {
    //         return {...item, reply}
    //     } else {
    //         return item
    //     }
    // })

    // console.log("co", comments);

    
    // return res.status(200).json(comments);

    // const aw = await Post.updateOne(
    //   { _id: postId },
    //   { $push: { "comments.$.reply": comments } })
    // );
    // console.log(aw);
    // await aw.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});
router.put("/uncomments/:id", verifyToken, async (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.userId,
  };
  console.log("yahan", comment);
  try {
    console.log(req.params.id);
    const ans = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { comments: comment },
      },
      { new: true }
    ).populate("comments.postedBy", "_id username");
    console.log("not", ans);

    await ans.save();
    res.status(200).json(ans);
  } catch (err) {
    res.status(500).json(err);
  }
});



//GET Single Post

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id).populate("comments.postedBy", "_id username").populate("comments.replies.userId", "_id username")
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POSTS
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({ categories: { $in: [catName] } });
    } else {
      posts = await Post.find()
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE POST

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    console.log("pst", post);
    console.log("here is body", req.body);
    if (post.username === req.body.username) {
      try {
        console.log("dele post");
        await post.deleteOne();

        res.status(200).json("Post has been deleted");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      return "nothing";
    }
  } catch (err) {
    res.status(401).json("You can delete post");
  }
});

//UPDATE POST

router.put("/:id", verifyToken, async (req, res) => {
  try {
    console.log("come");
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  } catch (err) {}
});

module.exports = router;
