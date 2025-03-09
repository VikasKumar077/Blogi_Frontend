  "use client";

  import { useState, useEffect } from "react";
  import axios from "axios";
  import { useRouter } from "next/navigation";
  import styles from "../../styles/EditPost.module.css"; // Import CSS module

  export default function EditPost() {
    // const [title, setTitle] = useState("");
    // const [content, setContent] = useState("");
    // const [author, setAuthor] = useState("");
    const [post, setPost] = useState({});

    const [id, setId] = useState(null);

    const router = useRouter();

    // 🟩 Get the token from localStorage
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    
    // Fetch the existing post data
    useEffect(() => {
      const fetchPost = async () => {
        const pathId = window.location.pathname.split("/").pop();
        setId(pathId);
        if (pathId && token) {
          try {
            const response = await axios.get(
              `http://127.0.0.1:8000/posts/${pathId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            setPost(response.data);
          } catch (error) {
            console.error("Failed to fetch post:", error);
          }
        }
      };

      fetchPost();
    }, [id,token]);

    // Handle update post

  const updatePost = async () => {
    const pathId = window.location.pathname.split("/").pop();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("No token found. Please log in.");
      return;
    }

    try {
      await axios.put(
        `http://127.0.0.1:8000/update-post/${pathId}`,
        {
          title: post.title,
          content: post.content,
          author: post.author,
          is_public: post.is_public,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // 🟢 Send the token here
            "Content-Type": "application/json",
          },
        }
      );
      router.push("/");
    } catch (error) {
      console.error("Failed to update post:", error.response?.data || error);
      alert(error.response?.data?.detail || "Failed to update the post");
    }
  };



    // Handle delete post
const deletePost = async () => {
  const pathId = window.location.pathname.split("/").pop();
  const token = localStorage.getItem("token"); // Get token from localStorage

  if (!token) {
    alert("You must be logged in to delete a post.");
    return;
  }

  try {
    await axios.delete(`http://127.0.0.1:8000/delete-post/${pathId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Send token in headers
      },
    });
    alert("Post deleted successfully!");
    router.push("/"); // Redirect to home after deleting
  } catch (error) {
    console.log(error)
    if (error.response) {
      // 🟢 Handle server-side errors
      const errorMessage =
        error.response.data.detail || "Failed to delete post";
      alert(errorMessage);
      console.log(error)
    } else {
      // 🛑 Handle network or unexpected errors
      alert("An unexpected error occurred. Please try again.");
    }
  }
};


    return (
      <div className={styles.container}>
        <h1 className={styles.heading}>Edit Post</h1>
        <div className={styles.postCard}>
          <input
            className={styles.input}
            placeholder="Post Title"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
          />
          <textarea
            className={styles.textarea}
            placeholder="Post Content"
            value={post.content}
            onChange={(e) => setPost({ ...post, content: e.target.value })}
          />
          <input
            className={styles.input}
            placeholder="Author Name"
            value={post.author || ""}
            readOnly
          />
          <div className={styles.buttonGroup}>
            <button className={styles.updateButton} onClick={updatePost}>
              ✅ Update Post
            </button>
            <button className={styles.deleteButton} onClick={deletePost}>
              ❌ Delete Post
            </button>
          </div>
        </div>
      </div>
    );
  }
