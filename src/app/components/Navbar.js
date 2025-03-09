
"use client"

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import styles from "../styles/Navbar.module.css"

export default function Navbar() {
  const router = useRouter();
  const [username, setUsername] = useState("");

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
      if (token) {
        console.log("token:", token);
      try {
          const decoded = jwtDecode(token);
          console.log("usernameee",decoded.username)
        setUsername(decoded.username); // Use 'sub' as username
      } catch (error) {
        console.error("Invalid token:", error);
        setUsername("");
      }
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    
    setUsername("");
    router.push("/login");
  };

  return (
    // <nav>
    //   <button onClick={() => router.push("/")}>Home</button>
    //   <button onClick={() => router.push("/public")}>Public Posts</button>

    //   {token ? (
    //     <>
    //       <span>Welcome, {username || "User"}!</span>
    //       <button onClick={() => router.push("/create-post")}>Create Post</button>
    //       <button onClick={handleLogout}>Logout</button>
    //     </>
    //   ) : (
    //     <>
    //       <button onClick={() => router.push("/login")}>Login</button>
    //       <button onClick={() => router.push("/register")}>Register</button>
    //     </>
    //   )}
    // </nav>

    <nav className={styles.navbar}>
      <div className={styles.navLinks}>
        <button className={styles.button} onClick={() => router.push("/")}>
          Home
        </button>
        {/* <button
          className={styles.button}
          onClick={() => router.push("/public")}
        >
          Public Posts
        </button> */}
      </div>

      {token ? (
        <div className={styles.authButtons}>
          <span className={styles.welcomeText}>
            Welcome, {username || "User"}!
          </span>
          <button
            className={styles.button}
            onClick={() => router.push("/create-post")}
          >
            Create Post
          </button>
          <button
            className={`${styles.button} ${styles.logout}`}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className={styles.authButtons}>
          <button
            className={styles.button}
            onClick={() => router.push("/login")}
          >
            Login
          </button>
          <button
            className={styles.button}
            onClick={() => router.push("/register")}
          >
            Register
          </button>
        </div>
      )}
    </nav>
  );
}
