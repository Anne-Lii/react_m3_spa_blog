import "./PostPage.css";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

type PostType = { 
  _id: string; 
  title: string; 
  description: string; 
  createdAt: string 
};

const PostPage = () => {

  //States
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<PostType | null>(null);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");//check if user is logged in

  //Refs for inline editing
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`https://react-api-m3.onrender.com/post/${id}`);
        if (!response.ok) {
          throw new Error("Kunde inte hämta blogginlägget.");
        }
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
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  //function to save updates from inline editing
  const updatePost = async () => {

    const token = localStorage.getItem("token");

    if (!token || !titleRef.current || !descriptionRef.current) return;
    const newTitle = titleRef.current.innerText;
    const newDescription = descriptionRef.current.innerText;
    try {
      const response = await fetch(`https://react-api-m3.onrender.com/post/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title: newTitle, description: newDescription })
      });
      if (!response.ok) {
        throw new Error("Kunde inte uppdatera inlägget.");
      }
      setPost({ ...post!, title: newTitle, description: newDescription });
      setIsEditing(false);
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

  //RETURN
  return (
    <div className="post-page">

      <Link to="/">Tillbaka</Link>
      <br />

      {isEditing ? (
        <div className="inline-edit">
          {/* Makes title editable */}
          <h1 
            ref={titleRef} 
            contentEditable 
            suppressContentEditableWarning={true}
            className="editable-title"
          >
            {post.title}
          </h1>
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
          {/* Makes description editable */}
          <p 
            ref={descriptionRef} 
            contentEditable 
            suppressContentEditableWarning={true}
            className="editable-description"
          >
            {post.description}
          </p>
          <button onClick={updatePost}>Spara ändringar</button>
          <button onClick={() => setIsEditing(false)}>Avbryt</button>
        </div>
      ) : (
        <div className="display-mode">
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
          {isLoggedIn && (
            <div className="action-buttons">
              <button onClick={deletePost}>Radera</button>
              <button onClick={() => setIsEditing(true)}>Redigera</button>
            </div>
          )}
        </div>
      )}

      <br />
      <Link to="/">Tillbaka</Link>
    </div>
  );
};

export default PostPage;
