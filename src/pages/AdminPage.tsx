import "./AdminPage.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  //validate input
  const validateForm = () => {
    if (title.trim().length < 3) {
      setError("Rubriken måste vara minst 3 tecken lång och får inte bara vara mellanslag.");
      return false;
    }
    if (content.trim().length < 3) {
      setError("Texten måste vara minst 3 tecken lång och får inte bara vara mellanslag.");
      return false;
    }
    //if ok, clear message
    setError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    //check form
    if (!validateForm()) {
      return;
    }

    const token = localStorage.getItem("token");

    const postData = {
      title,
      description: content,
    };

    try {
      const response = await fetch("https://react-api-m3.onrender.com/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, //Send JWT-token with request
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error("Misslyckades att skapa inlägget.");
      }

      setMessage("Inlägget har publicerats!");
      setShowPopup(true);
      setTitle("");
      setContent("");

    } catch (error) {
      setMessage("Misslyckades att skapa inlägget ");
      console.error(error);
    }
  };

  const handlePopUpOk = ()=> {
    setShowPopup(false);//hide pop-up
    navigate("/");//redirect to startpage
  };


  return (
    <div>
      <h1>Admin</h1>
      <form className="post_form" onSubmit={handleSubmit}>
        <h2>Nytt blogginlägg:</h2>

        {/* Show error messages if there is any */}
        {error && <p className="error-message">{error}</p>}

        <label htmlFor="title">Rubrik:</label>
        <br />
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />

        <label htmlFor="content">Text:</label>
        <br />
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <br />

        <button type="submit">Publicera</button>
      </form>

      {message && !showPopup && <p>{message}</p>}

      {showPopup && (
        <div className="popup-overlay">
        <div className="popup">
          <p>{message}</p>
          <button onClick={handlePopUpOk}>OK</button>
        </div>
      </div>
      )}
    </div>
  );
};

export default Admin;
