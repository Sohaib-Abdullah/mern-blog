import { useState } from "react";
import "./register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormInput from "./form/FormInput";


const Register = () => {
  const navigate = useNavigate();

  // const [email, setEmail] = useState("");
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const [values, setValues] = useState({
    email: "",
    username: "",
    password: "",
  });

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address",
      label: "Email",
      required: true,
    },
    {
      id: 2,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-16 characters and should not include specail character",
      label: "Username",
      pattern: "^[A-Za-z9-0]{3,}$",
      required: true,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include and at least contain 1 letter 1 number and 1 special character",
      label: "Password",
      pattern: `^[A-Za-z9-0]{6,}$`,
      required: true,
    },
  ];
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(values);
      await axios.post("/auth/register", values);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="registerContainer">
      <div className="registerWrapper">
        <h1 className="registerTitle">CREATE AN ACCOUNT</h1>
        <form className="registerForm" onSubmit={handleSubmit}>
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}

          <button className="registerButton">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
