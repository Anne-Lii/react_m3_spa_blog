import './ArchivePage.css';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

type Post = {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
};

const ArchivePage = () => {
  const { year, month } = useParams<{ year: string; month: string }>();
  const [posts, setPosts] = useState<Post[]>([]);
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

  if (!year || !month) {
    return <div>Ogiltiga arkiv-parametrar.</div>;
  }

  //Filter posts based on year and month
  const filteredPosts = posts.filter((post) => {
    const date = new Date(post.createdAt);
    return (
      date.getFullYear() === parseInt(year, 10) &&
      date.getMonth() + 1 === parseInt(month, 10)
    );
  });

  return (
    <div className="monthly-posts">
        <h1>
            Inlägg{" "}
            {new Date(parseInt(year, 10), parseInt(month, 10) - 1).toLocaleString("sv-SE", {
            month: "long",
            })}{" "}
            {year}
        </h1>
        {error && <p>{error}</p>}
        {filteredPosts.length === 0 ? (
            <p>Inga inlägg hittades för denna månad.</p>
        ) : (
            filteredPosts.map((post) => (
                <article key={post._id}>
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
                    <p>{post.description}</p>
                </article>
            ))
        )}
    </div>
  );
};

export default ArchivePage;
