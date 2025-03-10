"use client";

import { API_URL } from "../../utils/api";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from "./styles/Home.module.css";
import Navbar from "./components/Navbar";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // 🟢 Add loading state

  const router = useRouter();
  console.log("test");
  console.log(`api_url${API_URL}`);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true); // 🟢 Start loading
    try {
      console.log("debug");
      const response = await axios.get(`${API_URL}/public-posts/`);
      setPosts(response.data);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      alert("Failed to load posts. Please try again.");
    } finally {
      setLoading(false); // 🟢 Stop loading
    }
  };

 const truncateText = (text, maxLength,postId) => {
   if (!text) return ""; 

   return text.length > maxLength ? (
     <>
       {text.slice(0, maxLength)}
       <span
         style={{ color: "#007bff", fontWeight: "bold", cursor: "pointer" }}
         onClick={() => router.push(`/view/${postId}`)} 
       >
         ...Read More
       </span>
     </>
   ) : (
     text
   );
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
        <h1 className={styles.heading}>BLOGI | Be Always Updated</h1>

        {/* 🟢 Show loader while loading */}
        {loading ? (
          <div className={styles.loaderContainer}>
            <div className={styles.loader}></div>
            <p>Loading posts, please wait...</p>
          </div>
        ) : (
          <div className={styles.postsContainer}>
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post.id} className={styles.postCard}>
                  <h2>{post.title}</h2>
                  <p className={styles.content}>{truncateText(post.content,150,post.id) }</p>
                  {/* <p>{post.content}</p> */}
                  <p className={styles.author}>Author: {post.author}</p>
                  <div className={styles.buttonGroup}>
                    <button
                      className={styles.viewButton}
                      onClick={() => router.push(`/view/${post.id}`)}
                    >
                      👁 View
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ textAlign: "center" }}>No posts available.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}
