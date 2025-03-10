"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../styles/ViewPost.module.css"; // Import CSS module
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import { API_URL } from "../../../../utils/api";
export default function ViewPost() {
  const [post, setPost] = useState({});
  const [id, setId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const pathId = window.location.pathname.split("/").pop();
    setId(pathId);

    if (pathId) {
      const fetchPost = async () => {
        try {
          const response = await axios.get(
            `${API_URL}/posts/${pathId}`
          );
          setPost(response.data);
        } catch (error) {
          console.error("Failed to fetch post:", error);
        }
      };
      fetchPost();
    }
  }, []);

  // Handle delete post
  const deletePost = async () => {
    const pathId3 = window.location.pathname.split("/").pop();
    const token = localStorage.getItem("token"); // Get token from localStorage

    if (!token) {
      alert("You must be logged in to delete a post.");
      return;
    }

    try {
      await axios.delete(`${API_URL}/delete-post/${pathId3}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in headers
        },
      });
      alert("Post deleted successfully!");
      router.push("/"); // Redirect to home after deleting
    } catch (error) {
      if (error.response) {
        // 🟢 Show server error message
        const errorMessage =
          error.response.data.detail || "Failed to delete post";
        alert(errorMessage);
        console.log(error)
      } else {
        // 🛑 Handle unexpected errors
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };
 const formatDate = (utcDate) => {
   return new Date(utcDate).toLocaleString("en-IN", {
     timeZone: "Asia/Kolkata",
   });
 };


  return (
    <>
      <Navbar />
      <div className={styles.container}>
        {post ? (
          <div className={styles.postCard}>
            <h1 className={styles.heading}>{post.title}</h1>
            <p className={styles.content}>{post.content}</p>
            <p className={styles.author}>
              <b>Author:</b> {post.author}
            </p>
            <p className={styles.lastUpdate}>
              <b>Last Updated:</b> {formatDate(post.last_updated)}
            </p>
            <p className={styles.lastUpdate}>
              <b>Created At:</b> {formatDate(post.created_at)}
            </p>

            <div className={styles.buttonGroup}>
              <button
                className={styles.editButton}
                onClick={() => router.push(`/edit/${post.id}`)}
              >
                ✏ Edit
              </button>
              <button
                className={styles.homeButton}
                onClick={() => router.push("/")}
              >
                ⬅ Back to Home
              </button>
              <button className={styles.deleteButton} onClick={deletePost}>
                🗑 Delete Post
              </button>
            </div>
          </div>
        ) : (
          <p className={styles.loading}>Loading...</p>
        )}
      </div>
    </>
  );
}
