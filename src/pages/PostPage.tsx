import './PostPage.css';
import { useParams, Link, useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";

type PostType = { 
  _id: string; 
  title: string; 
  description: string; 
  createdAt: string 
};

const PostPage = () => {

  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<PostType | null>(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");//check if user is logged in

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`https://react-api-m3.onrender.com/post/${id}`);
        if (!response.ok) {
          throw new Error("Kunde inte hämta blogginlägget.");
        }
        
        //Trying to read the response as text first then JSON
        const text = await response.text();
        const data = text ? JSON.parse(text) : null;
      
        
        setPost(data);
      } catch (err) {
        setError("Kunde inte ladda inlägget.");
        console.error(err);
      }
    };

    fetchPost();
  }, [id]);

    //function to delete a post
    const deletePost = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const response = await fetch(`https://react-api-m3.onrender.com/post/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error("Kunde inte radera inlägget.");
        }
        //navigate back to homepage after removing post
        navigate("/");
      } catch (err) {
        console.error(err);
      }
    };

  if (error) {
    return <p>{error}</p>;
  }

  if (!post) {
    return <p>Hittar inga inlägg...</p>;
  }


  return (
    <div className="post-page">
      <Link to="/">Tillbaka</Link>
      <h1>{post.title}</h1>
      <p className="published">
        Publicerad:{" "}
        {new Date(post.createdAt).toLocaleString("sv-SE", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
      </p>
      <p>{post.description}</p>
      <Link to="/">Tillbaka</Link>
      <br></br>
      {isLoggedIn && (
        <button onClick={deletePost}>Radera</button>
      )}
    </div>
  );
}

export default PostPage;
