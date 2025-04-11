// src/RegisterPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        console.log('Kayıt işlemi başlatıldı:', { username, password });
        // API'ye POST isteği gönder

const user = await fetch('http://localhost:5103/api/auth/getAll', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        user.json().then((data) => {
            console.log('Kullanıcılar:', data);
        }
        );
        const response = await fetch('http://localhost:5103/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            alert('Kayıt başarılı!');
            navigate('/login'); // login sayfasına yönlendir
        } else {
            response.json().then((data) => {
                alert(`Kayıt hatası: ${data.message}`);
            }
            );
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Kullanıcı Adı"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Şifre"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Kayıt Ol</button>
            </form>
        </div>
    );
};

export default RegisterPage;
