import { useState } from "react";
import "./navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/apiCall";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const dispatch = useDispatch();
 
    const  user = useSelector((state)=> state.user);
    console.log(user);

    const handleLogout =()=>{
            dispatch(logout)
    }
  return (
    <div className="navbarContainer">
    {user.currentUser ? (
        <>
        <div className="navbarName">
          <span>
            Welcome to the <b>{user.currentUser.isAdmin ? "admin" : "user"}</b> page{" "}
            <b>{user.currentUser.username}</b>.
          </span>

          <Link to="/" className="link">
          <span className="favLink">Home</span>
          </Link>
          <Link to="/favouritePosts" className="link">
          <span className="favLink">Favourite Posts</span>
          </Link>
          </div>
          <div className="navbar-links">
          <Link to="/createpost" className="link">
          <span>Create Post</span>
          </Link>
          <span className="logout" onClick={handleLogout}>{user && "LOGOUT"}</span>
          {/* <span>Delete Users:</span>
          <button className="deleteButton" onClick={() => handleDelete(1)}>
          {user.currentUser.username}
          </button>
          <button className="deleteButton" onClick={() => handleDelete(2)}>
          Delete Jane
        </button> */}
          {error && (
              <span className="error">
              You are not allowed to delete this user!
            </span>
          )}
          {success && (
              <span className="success">
              User has been deleted successfully...
            </span>
          )}
        </div>
        
          </>
      ) : (
        <>
        <div className="navbar-links">

        <Link to="/register" className="link">
        <span>Register</span>
        </Link>
        <Link to="/login" className="link">
        <span>Login</span>
        </Link>
        </div>
        </>
          
          )
          
        }
       </div> 

  )}
    
export default Navbar