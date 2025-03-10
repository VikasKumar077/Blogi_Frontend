
"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import styles from "../styles/Login.module.css"
import { API_URL } from "../../../utils/api";

export default function Login() {
  const [user, setUser] = useState({ username: "", password: "" });
  const router = useRouter();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, user);
      const { token, username } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("username", username);

      alert("Login successful!");
      router.push("/");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <h1 className={styles.heading}>Login</h1>
        <input
          className={styles.inputField}
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />
        <input
          className={styles.inputField}
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button className={styles.loginButton} onClick={handleLogin}>
          🔑 Login
        </button>
      </div>
    </div>
  );
}
