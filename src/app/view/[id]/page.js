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
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const router = useRouter();

  // Fetch post & user on load
  useEffect(() => {
    const pathId = window.location.pathname.split("/").pop();
    setId(pathId);

    const storedToken = localStorage.getItem("token");
    const loggedInUser = localStorage.getItem("username");

    setToken(storedToken);
    setCurrentUser(loggedInUser);

    if (pathId) {
      setLoading(true);
      fetchPost(pathId);
    }
  }, []);

  // Fetch single post
  const fetchPost = async (postId) => {
    try {
      const response = await axios.get(`${API_URL}/posts/${postId}`);
      setPost(response.data);
    } catch (error) {
      console.error("Failed to fetch post:", error);
      alert("Failed to load post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle delete post
  const deletePost = async () => {
    if (!token) {
      alert("You must be logged in to delete a post.");
      return;
    }

    try {
      await axios.delete(`${API_URL}/delete-post/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Post deleted successfully!");
      router.push("/");
    } catch (error) {
      if (error.response) {
        const errorMessage =
          error.response.data.detail || "Failed to delete post";
        alert(errorMessage);
      } else {
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
        {loading ? (
          <div className={styles.loaderContainer}>
            <div className={styles.loader}></div>
            <p className={styles.loadingText}>Loading post details...</p>
          </div>
        ) : post ? (
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
              {token ? (
                <>
                  {currentUser === post.author ? (
                    <>
                      <button
                        className={styles.editButton}
                        onClick={() => router.push(`/edit/${post.id}`)}
                      >
                        ✏ Edit
                      </button>
                      <button
                        className={styles.deleteButton}
                        onClick={deletePost}
                      >
                        🗑 Delete Post
                      </button>
                    </>
                  ) : (
                    <p className={styles.authMessage}>
                      ⚠ You can only edit or delete your own posts.
                    </p>
                  )}
                </>
              ) : (
                <p className={styles.authMessage}>
                  🔒 Login to edit or delete this post.
                </p>
              )}
              <button
                className={styles.homeButton}
                onClick={() => router.push("/")}
              >
                ⬅ Back to Home
              </button>
            </div>
          </div>
        ) : (
          <p className={styles.loading}>Post not found.</p>
        )}
      </div>
    </>
  );
}

