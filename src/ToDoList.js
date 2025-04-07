import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5103/api/ToDoList';

const YapilacaklarListesi = () => {
    const [gorev, setGorev] = useState('');
    const [gorevler, setGorevler] = useState([]);
    const [tamamlananGorevler, setTamamlananGorevler] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(API_URL);
                setGorevler(response.data);
            } catch (error) {
                console.error('Görevler alınırken hata:', error);
            }
        };
        fetchData();
    }, []);

    const gorevEkle = async () => {
        if (gorev.trim() !== '') {
            try {
                const response = await axios.post(API_URL, {
                    Name: gorev,
                    IsCompleted: false,
                    CreatedAt: new Date().toISOString(),
                });

                // Gelen veriyi normalize et
                const yeniGorev = {
                    id: response.data.id,
                    Name: response.data.Name || response.data.name,
                    IsCompleted: response.data.IsCompleted,
                    CreatedAt: response.data.CreatedAt
                };

                setGorevler(prevGorevler => [...prevGorevler, yeniGorev]);
                setGorev('');
            } catch (error) {
                console.error('Görev ekleme hatası:', error.response?.data || error.message);
            }
        }
    };

    const tamamlandi = async (id) => {
        try {
            const tamamlanan = gorevler.find(g => g.id === id);
            if (tamamlanan) {
                await axios.put(`${API_URL}/${id}`, { ...tamamlanan, IsCompleted: true });
                setTamamlananGorevler(prev => [...prev, tamamlanan]);
                setGorevler(prev => prev.filter(g => g.id !== id));
            }
        } catch (error) {
            console.error('Tamamlandı olarak işaretleme hatası:', error.response?.data || error.message);
        }
    };

    const gorevSil = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setGorevler(prev => prev.filter(g => g.id !== id));
            setTamamlananGorevler(prev => prev.filter(g => g.id !== id));
        } catch (error) {
            console.error('Silme hatası:', error.response?.data || error.message);
        }
    };

    return (
        <div>
            <h2>Yapılacaklar Listesi</h2>
            <div>
                <input
                    type="text"
                    value={gorev}
                    onChange={(event) => setGorev(event.target.value)}
                    placeholder="Yeni görev"
                />
                <button onClick={gorevEkle}>Ekle</button>
            </div>

            <div>
                <h3>Aktif Görevler</h3>
                <ul>
                    {gorevler.map(g => (
                        <li key={g.id}>
                            {g.Name || g.name}
                            <button onClick={() => tamamlandi(g.id)}>Tamamlandı</button>
                            <button onClick={() => gorevSil(g.id)}>Sil</button>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h3>Tamamlanan Görevler</h3>
                <ul>
                    {tamamlananGorevler.map(g => (
                        <li key={g.id}>
                            <del>{g.Name || g.name}</del>
                            <button onClick={() => gorevSil(g.id)}>Sil</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default YapilacaklarListesi;
