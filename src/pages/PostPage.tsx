import './PostPage.css';
import { useParams, Link } from "react-router-dom";
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
    </div>
  );
}

export default PostPage;
