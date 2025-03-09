"use client"


import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from "./styles/Home.module.css"
import Navbar from "./components/Navbar";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
   
    fetchPosts();
  }, []);


  const fetchPosts = async () => {
     console.log("debug")
     const response = await axios.get("http://127.0.0.1:8000/public-posts/");
     setPosts(response.data);
   };
  // Handle delete post
  const deletePost = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/posts/${id}`);
      alert("Post deleted successfully!");
      fetchPosts(); // Refresh the post list
    } catch (error) {
      alert("Failed to delete post");
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.heading}>All Blog Posts|</h1>
        {/* <button
          className={styles.createButton}
          onClick={() => router.push("/create-post")}
        >
          ➕ Create New Post 1
        </button> */}
        <div className={styles.postsContainer}>
          {posts.map((post) => (
            <div key={post.id} className={styles.postCard}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <p className={styles.author}>Author: {post.author}</p>
              <div className={styles.buttonGroup}>
                <button
                  className={styles.viewButton}
                  onClick={() => router.push(`/view/${post.id}`)}
                >
                  👁 View
                </button>

                {/* show button with case */}
                {/* {post.is_public && (
                  <>
                    <button
                      className={styles.editButton}
                      onClick={() => router.push(`/edit/${post.id}`)}
                    >
                      ✏ Edit
                    </button>
                    <button
                      className={styles.deleteButton}
                      onClick={() => deletePost(post.id)}
                    >
                      Delete
                    </button>
                  </>
                )} */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
