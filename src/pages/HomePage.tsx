import './HomePage.css';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Archive from '../components/Archive'

const Home = () => {

  //States
  const [posts, setPosts] = useState<{ _id: string; title: string; description: string ; createdAt: string}[]>([]);
  const [error, setError] = useState("");
  const [loading, SetLoading] = useState(true);//loading when init

  const isLoggedIn = !!localStorage.getItem("token")
  
  //get posts
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
      } finally {
        SetLoading(false);//stop loading
      }
    };

    fetchPosts();
  }, []);

  //function to delete a post
  const deletePost = async(postId: string) => {

    const token = localStorage.getItem("token");

    if (!token) 
      return;
    try {
      const response = await fetch(`https://react-api-m3.onrender.com/post/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error("Misslyckades att radera inlägget.");
      }
      //update list after removing a post
      setPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
    } catch (err) {
      console.error(err);
    }

  };

  return (
    <div className="home-container">
      
      {/* Sidebar to the left with latest posts */}
      <aside className="sidebar left">
        <h2>Senaste inlägg</h2>
        <ul>
          {[...posts]
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 3)
            .map((post) => (
              <li key={post._id}>
                <Link to={`/post/${post._id}`}>{post.title}</Link>
              </li>
            ))
          }
        </ul>
      </aside>

      {/* Main content, all posts sorted with the latest first */}
      <main className="content">
      <h1>Anne-Lii´s Blogg</h1>
      {loading ? (
        <p className='loading_message'>Hämtar inlägg...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          
          {posts
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((post) => (
              <article key={post._id} className="blog-post">
                <h2>{post.title}</h2>
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
                <p>
                  {post.description.length > 200
                    ? post.description.substring(0, 100) + "..."
                    : post.description}
                </p>
                <Link to={`/post/${post._id}`} className='link_readmore'>Läs mer...</Link>
                <br></br>
                {isLoggedIn && (<button onClick={()=> deletePost(post._id)}>Radera</button>)}
              </article>
            ))}
        </>
      )}
    </main>

    {/* Archive with year and months */}
    <aside className="sidebar right">
      <Archive posts={posts} />
    </aside> 
      
    </div>
  );
}

export default Home;

