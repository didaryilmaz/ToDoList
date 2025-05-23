import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5103/api/Auth/login", {
        username,
        password,
      });
  
      const token = response.data.token;
      const decodedToken = jwtDecode(token);
  
      const role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  
      console.log("JWT'den çözülen rol:", role);
  
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      localStorage.setItem("role", role);
  
      if (role === "Admin") {
        navigate("/admin");
      } else {
        navigate("/todos");
      }
    } catch (error) {
      alert("Giriş başarısız: " + (error.response?.data || error.message));
    }
  };
  

  return (
    <div>
      <h2>Giriş Yap</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Kullanıcı Adı"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Giriş Yap</button>
      </form>
    </div>
  );
};

export default LoginPage;
