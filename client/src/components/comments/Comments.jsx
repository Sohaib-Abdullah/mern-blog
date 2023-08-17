import "./comments.css";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";

const Comments = () => {
 
  const location = useLocation();
  const path = location.pathname.split("/")[2];
 

const user = useSelector((state) => state.user.currentUser);
const [post, setPost] = useState({});
const [comments, setComments] = useState([]);
const [newComment, setNewComment] = useState("");
const [commentUpdateMode, setCommentUpdateMode] = useState(false);
const [reply, setReply] = useState("");
const [replyFormStates, setReplyFormStates] = useState({});

useEffect(() => {
  const getComment = async () => {
    const res = await axios.get("/posts/" + path);
    const prevcomments = await res.data.comments
    
    setComments(prevcomments);
  };
  getComment();
}, []);

    const handleCommentSubmission = async (e) => {
        e.preventDefault();
    
        try {
          const commented = await axios.put(
            `/posts/comments/${path}`,
            { newComment },
            { headers: { token: "Bearer " + user.token } }
          );
          const newlyComment = commented.data.comments;
          // props.onAddComment(newlyComment);
          setComments(newlyComment)
        } catch (err) {
          console.log(err);
        }
        e.target.reset();
      };

      const handleCommentDeleteFor = async (deleteCommentId) => {
        try {
          await axios.put(
            `/posts/deletecomment/${path}`,
            { deleteCommentId },
            { headers: { token: "Bearer " + user.token } }
          );         
          setComments(comments.filter((item) => item._id !== deleteCommentId));
       
        } catch (err) {
          console.log(err);
        }
      };

      const handleCommentReply = async (id) => {
        setReplyFormStates((prevState) => ({
          ...prevState,
          [id]: true, // Open reply form for the specific comment
        }));
        console.log(replyFormStates);
      };
      
      const handleCommentSubmit = async (commentId, reply) => {
        // Handle the submission of the reply and update the comments state
        // Reset the reply form state for the specific comment
    
        const replyText = await axios.put(
          "/posts/replycomment",
          { postId: path, commentId: commentId, reply: reply },
          { headers: { token: "Bearer " + user.token } }
        );
        console.log("rr", replyText);
        setComments(replyText.data.comments);
        console.log("ij", commentId);
        setReplyFormStates((prevState) => ({
          ...prevState,
          [commentId]: false,
        }));
      };
  return (
    <div>
           <div className="postComment">
          <form onSubmit={handleCommentSubmission}>
            <input
              type="text"
              placeholder="Add Comments"
              name="postCommentField"
              className="postCommentsArea"
              onChange={(e) => setNewComment(e.target.value)}
            />
            <hr/>
            <button type="submit" className="postCommentbtn">
              Post Your Comment
            </button>
          </form>
        </div>
        <div className="showComments">
          {comments?.map((item) => {
            const isReplyFormOpen = replyFormStates[item._id];
            return (
              <>
                <span className="commentorname" key={item._id}> {item.postedBy.username}</span>
                <span className="commentDate">
                  {new Date(item.created).toDateString()}
                </span>
                <div className="commentText">
                  {item.text} <i class="fa-solid fa-thumbs-up"></i>
                  <i className=" singlePostIcon fa-solid fa-trash-can"
                    onClick={() => handleCommentDeleteFor(item._id)}
                  ></i>
                  <i className=" singlePostIcon fa-solid fa-pen-to-square"
                    onClick={() => setCommentUpdateMode(true)}
                  ></i>
                  <span
                    className="commentsreply"
                    onClick={() => handleCommentReply(item._id)}
                  >
                    reply
                  </span>
                  
                  {/* <span>{item.replies.message}</span> */}
                 
                  <div className="showsreplies">
                    {item.replies.map((rep) => {
                      return (
                        <div>
                          <span className="replies">{rep.message}</span>
                          <span className="replierName">{rep.userId.username}</span>
                        </div>
                      );
                    })}
                  </div>
                  {isReplyFormOpen && (
                    <form>
                      <input
                        type="text"
                        onChange={(e) => setReply(e.target.value)}
                      />
                      <button
                        type="submit"
                        onClick={(e) => {
                          e.preventDefault();
                          handleCommentSubmit(item._id, reply);
                        }}
                      >
                        Submit Reply
                      </button>
                    </form>
                  )}

                 
                </div>
              </>
            );
          })}
        </div>
    </div>
  )
}

export default Comments