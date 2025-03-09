"use client"


import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from "../styles/CreatePost.module.css"; // Import CSS module

export default function CreatePost() {
  // const [title, setTitle] = useState("");
  // const [content, setContent] = useState("");
  // const [author, setAuthor] = useState("");

  const [post, setPost] = useState({ title: '', content: '', author: '', is_public: true });
  const router = useRouter();

  const createPost = async () => {

    try {
      const token = localStorage.getItem("token");
       await axios.post("http://localhost:8000/posts/", post, {
         headers: { Authorization: `Bearer ${token}` },
       });
       router.push("/");
    }
    catch (error)
    {
            console.error("Failed to create post:", error);
    }
   
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Create New Post</h1>
      <div className={styles.formCard}>
        <input
          className={styles.inputField}
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className={styles.textareaField}
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          className={styles.inputField}
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button className={styles.createButton} onClick={createPost}>
          ➕ Create Post
        </button>
      </div>
    </div>
  );
}
