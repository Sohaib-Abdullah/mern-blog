import "./App.css";
import axios from "axios";
import { useState } from "react";
import jwt_decode from "jwt-decode";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Write from "./pages/write/Write";
import Single from "./pages/single/Single";
import { useSelector } from "react-redux";
import FavouritePosts from "./pages/favouritePosts/FavouritePosts";


function App() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  const user = useSelector((state)=> state.user.currentUser);
  console.log(user);

  // const refreshToken = async () => {
  //   console.log("hi");
  //   try {
  //     const res = await axios.post("/refresh", { token: user.refreshToken });
  //     console.log(res.data)
  //     setUser({
  //       ...user,
  //       accessToken: res.data.accessToken,
  //       refreshToken: res.data.refreshToken,
  //     });
  //     return res.data;
    
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const axiosJWT = axios.create()

  // axiosJWT.interceptors.request.use(
  //   async (config) => {
  //     let currentDate = new Date();
  //     console.log(currentDate);
  //     const decodedToken = jwt_decode(user.accessToken);
  //     if (decodedToken.exp * 1000 < currentDate.getTime()) {
  //       const data = await refreshToken();
  //       config.headers["authorization"] = "Bearer " + data.accessToken;
  //     }
  //     return config;
  //   },
  //   (error) => {
  //     return Promise.reject(error);
  //   }
  // );




  return (
    <>
     <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register/>} />
        <Route path="/login" element={user ? <Navigate to="/" />: <Login/>}/>
        <Route path="/createpost" element={<Write/>}/>
        <Route path="/post/:postId" element={<Single/>} />
        <Route path="/favouritePosts" element={user ? <FavouritePosts/> : <Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
