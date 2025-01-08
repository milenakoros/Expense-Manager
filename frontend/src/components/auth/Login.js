import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      alert('Logowanie zakończone sukcesem!');
      navigate('/user');
    } catch (error) {
      alert('Nieprawidłowy adres e-mail lub hasło.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Logowanie</h1>
      <input
        type="email"
        placeholder="Adres e-mail"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Hasło"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
      />
      <button type="submit">Zaloguj się</button>
    </form>
  );
};

export default Login;
