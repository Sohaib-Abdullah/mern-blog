import { Link } from "react-router-dom";
import "./post.css";

export default function Post({ post }) {
  const PF = "http://localhost:5000/images/";

  return (
    <div className="showPost">
      
      {post.photo && 
           <Link to={`/post/${post._id}`} className="showPostLink">

        <img src={PF + post.photo} className="showPostImg" alt="" />
        </Link>
        }
        <div className="showPostInfo">
           <Link to={`/post/${post._id}`} className="showPostLink">
            <span className="showPostTitle">{post.title}</span>
           </Link>
           <span className="showPostDate">
            {new Date(post.createdAt).toDateString()}
           </span>
            </div>
            <p className = "showPostDesc">{post.desc}</p>
      
    </div>
  );
}
