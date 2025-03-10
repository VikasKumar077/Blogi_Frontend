"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import styles from "../styles/Navbar.module.css";

export default function Navbar() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUsername(decoded.username);
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
    <nav className={styles.navbar}>
      <div className={styles.logo} onClick={() => router.push("/")}>
        BLOGI
      </div>

      <button
        className={styles.menuToggle}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {token && (
        <span className={styles.welcomeText}>
          Welcome, {username || "User"}
        </span>
      )}

      <div className={`${styles.navLinks} ${menuOpen ? styles.active : ""}`}>
        <button className={styles.button} onClick={() => router.push("/")}>
          Home
        </button>
        {token ? (
          <>
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
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </nav>
  );
}
