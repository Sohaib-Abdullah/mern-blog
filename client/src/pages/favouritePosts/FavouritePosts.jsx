import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import "./favouritePosts.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const FavouritePosts = () => {
    const PF = "http://localhost:5000/images/";
    const [fPosts, setFPosts] = useState([]);

    const  user  = useSelector((state)=> state.user.currentUser);
    // console.log(user._id);
    useEffect(()=> {
        const getFavPost = async () =>{ 

         const res =  await  axios.get("/user/favPosts", {headers: {token: "Bearer " + user.token}} );
         setFPosts(res.data);
         console.log(res.data);
        }
        getFavPost();
    },[])
  return (
    <div>
    <Navbar/>
    <Header/>
        <div className="showFPosts">
            {fPosts.map((post)=>{
                return(
                <div>
                {post.photo && 
                <div className="showFPost">
                    <img src={PF + post.photo} className="showPostImg" alt="" />
                    <div className="showFPostInfo">
                    <Link to={`/post/${post._id}`} className="showFPostLink">
                        <span className="showFPostTitle">{post.title}</span>
                    </Link>
                    <hr/>
                    <span className="showFPostDate">
                    {new Date(post.createdAt).toDateString()}
                    </span>
                    </div>
                    <p className="showFPostDesc">{post.desc}</p>
                </div>
                }    
                </div>
                )
              
               
                
}
            )}
        </div>

    </div>
  )
}

export default FavouritePosts