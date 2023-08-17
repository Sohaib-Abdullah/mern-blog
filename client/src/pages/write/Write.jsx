
import axios from "axios";
// import { useContext } from "react";
import { useEffect, useState } from "react"
// import { Context } from "../../context/Context";
import "./write.css"
import { useSelector } from "react-redux";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);

//   const {user} = useContext(Context);
const  user = useSelector((state)=> state.user.currentUser);
console.log(user.token);
    
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    }
    if(file){
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      }catch(err){

      }
    }
   
    console.log(newPost)
    try {
      const res = await axios.post("/posts/", {newPost}, {
        headers: { token: "Bearer " + user.token }});
        
      window.location.replace("/post/" + res.data._id);
    }catch(err){

    }
  }
  const handleTitle = (e)=>{
    e.preventDefault();
    const titleInput = e.target.value;
    setTitle(titleInput.toUpperCase());
  }

  return (
    <div className="write">
      {file && (

        <img 
        className="writeImg"
        src={URL.createObjectURL(file)}
        alt=""
        />
        )}
        <form className="writeForm" onSubmit={handleSubmit}>
            <div className="writeFormGroup">
                <label htmlFor="fileInput">
                <i className=" writeIcon fa-solid fa-plus"></i>
                </label>
                <input 
                type="file"
                 id="fileInput"
                style={{display:"none"}}
                onChange={(e)=> setFile(e.target.files[0])}
                
                  />
                <input 
                  type="text"
                  placeholder="Title"
                  className="writeInput"
                  autoFocus={true}
                  value={title}
                  onChange={handleTitle}
                  required
                    />
            </div>
            <div className="writeFormGroup">
                <textarea
                type="text"
                placeholder="Tell your story.."
                className="writeInput writeText"
                value={desc}
                onChange={e=> setDesc(e.target.value)}
                required
                >
                </textarea>
            </div>
            <button className="writeSubmit" type="submit">Publish</button>
        </form>
        </div>
  )
}
