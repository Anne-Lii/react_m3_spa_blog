import './HomePage.css';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {

  const [posts, setPosts] = useState<{ _id: string; title: string; description: string ; createdAt: string}[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://react-api-m3.onrender.com/post");
        if (!response.ok) {
          throw new Error("Kunde inte hämta blogginlägg.");
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError("Kunde inte ladda inlägg.");
        console.error(err);
      }
    };

    fetchPosts();
  }, []);


  return (
    <div className="home-container">
      
      <aside className="sidebar left">
        <h2>Senaste inlägg</h2>
        <ul>
          {posts.slice(0, 3).map((post) => (
            <li key={post._id}>
              <Link to={`/post/${post._id}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </aside>

      <main className="content">
        <h1>Anne-Lii´s Blogg</h1>
        {error ? (
          <p>{error}</p>
        ) : (
          posts.map((post) => (
            <article key={post._id} className="blog-post">
              <h2>{post.title}</h2>
              <p className="published">
                Publicerad: {new Date(post.createdAt).toLocaleString("sv-SE", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </p>
              <p>{post.description.length > 200 ? post.description.substring(0, 100) + "..." : post.description}</p>
              <Link to={`/post/${post._id}`}>Läs mer...</Link>
            </article>
          ))
        )}
      </main>

      
    </div>
  );
}

export default Home;

