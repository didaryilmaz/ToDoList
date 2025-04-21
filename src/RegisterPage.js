import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('User'); // default olarak "User"
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        const payload = { username, password, role };

        console.log('Gönderilen veri:', payload);

        const response = await fetch('http://localhost:5103/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            alert('Kayıt başarılı!');
            navigate('/login');
        } else {
            const data = await response.json();
            alert(`Kayıt hatası: ${data}`);
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
                <select value={role} onChange={(e) => setRole(e.target.value)} required>
                    <option value="User">Kullanıcı</option>
                    <option value="Admin">Admin</option>
                </select>
                <button type="submit">Kayıt Ol</button>
            </form>
        </div>
    );
};

export default RegisterPage;
