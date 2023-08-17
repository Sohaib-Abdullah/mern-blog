import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {loginStart, loginSuccess, loginFailure} from "../../redux/userSlice";
import { clearLoginError } from "../../redux/userSlice";
import "./login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Validation from "./Validation";


const Login = () => {
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    // const [success, setSuccess] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [values, setValues] = useState({
      email:"",
      password:""
    })
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(clearLoginError());
    }, [dispatch]);
    
    const { isFetching, error} = useSelector((state)=>state.user);

    const [errors, setErrors] = useState({})

    const handleInput = (e) =>{
      e.preventDefault();
      const newObj = {...values, [e.target.name]: e.target.value}
      setValues(newObj);
      dispatch(clearLoginError())
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        setErrors(Validation(values));
        dispatch(loginStart())
        
        try {
          const res =   await axios.post("/auth/login", values)
          dispatch(loginSuccess(res.data))
          navigate("/");
        
        }catch(err){
             dispatch(loginFailure())
        }
        setSubmitted(true)
        // try {
        //   const res = await axios.post("/login", {email, password });
        //   setUser(res.data);
        // } catch (err) {
        //   console.log(err);
        // }
        
    }

  return (
    <div className="login">
    <form onSubmit={handleSubmit}>
      <span className="formTitle"> Login</span>
      <input
        type="email"
        placeholder="Email"
        name= "email"
        // onChange={(e) => setEmail(e.target.value)}
        onChange={handleInput}
        required
      />
      <input
        type="password"
        placeholder="password"
        name="password"
        // onChange={(e) => setPassword(e.target.value)}
        onChange={handleInput}
        
      />
      {errors.password && <p style={{color:"red"}}>{errors.password}</p>}
      <button type="submit" className="submitButton">
        Login
      </button>
      {submitted &&  error && <span className="loginerror"> User Email or Password is mismatch</span>}
    </form>
  </div>
  )
}

export default Login