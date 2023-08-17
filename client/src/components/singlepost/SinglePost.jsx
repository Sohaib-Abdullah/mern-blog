import "./singlepost.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { favPost } from "../../redux/userSlice";
import Comments from "../comments/Comments";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = "http://localhost:5000/images/";
  const user = useSelector((state) => state.user.currentUser);
  console.log(user);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const [updateMode, setUpdateMode] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [iconColor, setIconColor] = useState();
  const [like, setLike] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setLike(res.data.likes.length);

      if (user.favPosts.includes(path)) {
        
        setIconColor("red");
      } 
    };
    getPost();
  }, []);

  useEffect(() => {
    setIsLiked(post?.likes?.includes(user._id));
  }, [user._id, post.likes, post._id]);


  const handleDelete = async () => {
    try {
      await axios.delete("/posts/" + path, {
        headers: { token: "Bearer " + user.token },
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `/posts/${post._id}`,
        {
          username: user.username,
          title,
          desc,
        },
        { headers: { token: "Bearer " + user.token } }
      );
      setUpdateMode(false);
    } catch (err) {}
  };

  const handleFavourites = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/user/favPosts",
        { postId: post._id },
        { headers: { token: "Bearer " + user.token } }
      );
      dispatch(favPost(response.data));
      if (user.favPosts.includes(post._id)) {
        setIconColor("#b39656");
      } else {
        setIconColor("red");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const likeHandler = async (e) => {
    console.log(user.token);
    try {
      await axios.put(
        `/posts/${post._id}/like`,
        {},
        { headers: { token: "Bearer " + user.token } }
      );
    } catch (err) {
      console.log(err);
    }
    console.log("like", like);
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <div className="singlePostDetails">
          {post.photo && (
            <img src={PF + post.photo} alt="" className="singlePostImg" />
          )}
          <div className="postlikeFavouriteWrapper">
                <div className="postLikeFavourite">
                  <span
                    className="like"
                    style={{ color: iconColor }}
                    onClick={handleFavourites}
                  >
                    <i class="fa-solid fa-heart"></i>
                  </span>
                  <span className="thumbsUp" onClick={likeHandler}>
                    <i class="fa-solid fa-thumbs-up"></i>
                  </span>
                  <span className="postLikeCounter">{like} people like it</span>
                  </div>
                  <div className="authorDetails">
                <span className="singlePostAuthor">
            <Link to={`/?user=${post.username}`} className="singlePostLink">
              Author:<b>{post.username}</b>
            </Link>
            <span className="singlePostDate">
              {new Date(post.createdAt).toDateString()}
            </span>
          </span>
          </div>
                </div>
          {updateMode ? (
            <input
              type="text"
              value={title}
              className="singlePostTitleInput"
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
            />
          ) : (
            <div className="titleandicon">
              <div>
                <h1 className="singlePostTitle">{title}</h1>
              </div>

              {post.username === user?.username && (
                <div className="singlePostEdit">
                  <i
                    className=" singlePostIcon fa-solid fa-pen-to-square"
                    onClick={() => setUpdateMode(true)}
                  ></i>
                  <i
                    className=" singlePostIcon fa-solid fa-trash-can"
                    onClick={handleDelete}
                  ></i>
                </div>
              )}
            </div>
          )}
             
        </div>
        <div className="singlePostInfo">
          {updateMode ? (
            <textarea
              className="singlePostDescInput"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
          ) : (
            <>
              <div className="postFeatures">
                <p className="singlePostDesc">{desc}</p>
             
              </div>
            </>
          )}
         
          {updateMode && (
            <button className="singlePostButton" onClick={handleUpdate}>
              Update
            </button>
          )}
        </div>
      </div>
      <Comments />     
    </div>
  );
}
