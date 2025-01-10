import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./auth.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      const response = await axios.post('http://localhost:5000/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      navigate('/user');
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || 'Nieprawidłowy adres e-mail lub hasło.'
      );
    }
  };

  return (
    <div className='auth-body'>
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1 className="auth-h1">Logowanie</h1>
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
        {errorMessage && <p className="auth-error">{errorMessage}</p>}
        <button type="submit">Zaloguj się</button>
      </form>
    </div>
  );
};

export default Login;
