"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import styles from "../styles/Create.module.css"

export default function CreatePost() {
  const [post, setPost] = useState({ title: "", content: "", author: "" });
  const [token, setToken] = useState(null);
  const router = useRouter();

  // 🟢 Load token only in the browser
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
      console.log("Loaded token from localStorage:", storedToken);
    }
  }, []);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!token) {
      alert("Unauthorized! Please log in.");
      router.push("/login");
      return;
    }

    console.log("Sending token to backend:", token);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/create-post/",
        post,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // 🟢 Add 'Bearer' prefix
          },
        }
      );

      console.log("Post creation response:", response.data);
      alert("Post created successfully!");
      router.push("/");
    } catch (error) {
      console.error(
        "Failed to create post:",
        error.response?.data || error.message
      );
      alert(
        `Failed to create post: ${
          error.response?.data?.detail || "Unknown error"
        }`
      );
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Create New Post</h1>
      <input
        name="title"
        placeholder="Title"
        onChange={handleChange}
        className={styles.input}
      />
      <textarea
        name="content"
        placeholder="Content"
        onChange={handleChange}
        className={styles.textarea}
      />
      <button onClick={handleSubmit} className={styles.button}>
        Create Post
      </button>
    </div>
  );
}
