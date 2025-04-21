import React from 'react';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>To Do List Uygulamasına Hoş Geldiniz</h1>

      <div style={styles.buttonGroup}>
        <button style={styles.button} onClick={() => navigate('/login')}>Giriş Yap</button>
        <button style={styles.button} onClick={() => navigate('/register')}>Kayıt Ol</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '100px'
  },
  title: {
    fontSize: '32px',
    marginBottom: '40px'
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px'
  },
  button: {
    padding: '15px 30px',
    fontSize: '18px',
    cursor: 'pointer',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#4CAF50',
    color: 'white'
  }
};

export default MainPage;
