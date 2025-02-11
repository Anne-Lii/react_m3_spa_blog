import "./AdminPage.css";
import React, { useState } from "react";

const Admin = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); // Token finns eftersom sidan är skyddad

    const postData = {
      title,
      description: content, // API:t använder "description"
    };

    try {
      const response = await fetch("https://react-api-m3.onrender.com/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Skickar JWT-token
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error("Misslyckades att skapa inlägget.");
      }

      setMessage("Inlägget har publicerats! 🎉");
      setTitle("");
      setContent("");

    } catch (error) {
      setMessage("Misslyckades att skapa inlägget 😢");
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Hantera bloggen</h1>
      <form className="post_form" onSubmit={handleSubmit}>
        <h2>Nytt blogginlägg:</h2>
        <label htmlFor="title">Rubrik:</label>
        <br />
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />

        <label htmlFor="content">Text:</label>
        <br />
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        <br />

        <button type="submit">Publicera</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default Admin;
