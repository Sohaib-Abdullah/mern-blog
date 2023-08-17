import { useEffect, useState } from "react";
import "./home.css";
import axios from "axios";
import { useSelector } from "react-redux";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import { useLocation } from "react-router-dom";
import Posts from "../../components/posts/Posts";

const Home = () => {

    const [posts, setPosts] = useState([]);
    const { search } = useLocation();
    console.log(search);
    // const handleDelete = async (id) => {
    //     setSuccess(false);
    //     setError(false);
    //     try {
    //       await axiosJWT.delete("/users/" + id, {
    //         headers: { authorization: "Bearer " + user.currentUser.accessToken },
    //       });
    //       setSuccess(true);
    //     } catch (err) {
    //       setError(true);
    //     }
    //   };

        useEffect(()=>{
          const fetchPosts = async ()=>{
            const res = await axios.get("/posts" + search);
            setPosts(res.data);
          }
          fetchPosts();
        },[search])

        console.log(posts);
  return (
    <>
    <Navbar/>
    <Header/>
    <Posts posts={posts} />
    
     
    
    </>
  )
}

export default Home