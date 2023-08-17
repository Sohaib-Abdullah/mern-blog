import "./posts.css";
import Post from '../post/Post'
// import Post from '../../api/models/Post'

export default function Posts  ({posts})  {
  return (
    <div className="showposts">
        {posts.map((p)=>(
            <Post post={p}/>
        ))}
    </div>
  )
}
