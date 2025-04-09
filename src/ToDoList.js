import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5103/api/ToDoList";

const ToDoList = () => {
  const [gorev, setGorev] = useState("");
  const [gorevler, setGorevler] = useState([]);
  const [tamamlananGorevler, setTamamlananGorevler] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGorevler(response.data.filter(g => !g.isCompleted));
      setTamamlananGorevler(response.data.filter(g => g.isCompleted));
    } catch (error) {
      console.error("Görevler alınırken hata:", error);
    }
  };

  const gorevEkle = async () => {
    if (gorev.trim() !== "") {
      try {
        const response = await axios.post(
          API_URL,
          {
            Name: gorev,
            IsCompleted: false,
            CreatedAt: new Date().toISOString(),
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setGorevler([...gorevler, response.data]);
        setGorev("");
      } catch (error) {
        console.error("Görev ekleme hatası:", error.response?.data || error.message);
      }
    }
  };

  const tamamlandi = async (id) => {
    const gorevTamam = gorevler.find((g) => g.id === id);
    if (gorevTamam) {
      try {
        await axios.put(`${API_URL}/${id}`, { ...gorevTamam, IsCompleted: true }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchData(); // Listeyi güncelle
      } catch (error) {
        console.error("Tamamlama hatası:", error.message);
      }
    }
  };

  const gorevSil = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
    } catch (error) {
      console.error("Silme hatası:", error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div>
      <h2>Yapılacaklar</h2>
      <button onClick={logout}>Çıkış Yap</button>

      <div>
        <input
          type="text"
          placeholder="Yeni görev"
          value={gorev}
          onChange={(e) => setGorev(e.target.value)}
        />
        <button onClick={gorevEkle}>Ekle</button>
      </div>

      <div>
        <h3>Aktif Görevler</h3>
        <ul>
          {gorevler.map((g) => (
            <li key={g.id}>
              {g.name}
              <button onClick={() => tamamlandi(g.id)}>Tamamlandı</button>
              <button onClick={() => gorevSil(g.id)}>Sil</button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Tamamlanan Görevler</h3>
        <ul>
          {tamamlananGorevler.map((g) => (
            <li key={g.id}>
              <del>{g.name}</del>
              <button onClick={() => gorevSil(g.id)}>Sil</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ToDoList;
 