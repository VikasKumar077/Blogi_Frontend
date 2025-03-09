
"use client"
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Register() {
    
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleRegister = async () => {
    if (user.password !== user.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/auth/register/",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          });
        
        console.log(response.data)
        console.log(response)
          
      if (response.status === 200) {
        alert("Registration successful! Please log in.");
        router.push("/login");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Try again!");
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <input name="name" placeholder="Full Name" onChange={handleChange} />
      <input name="username" placeholder="Username" onChange={handleChange} />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        onChange={handleChange}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}
