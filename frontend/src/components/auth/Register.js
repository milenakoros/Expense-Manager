import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./auth.css";

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Hasła muszą być takie same.');
      return;
    }
    try {
      await axios.post('http://localhost:5000/auth/register', formData);
      alert('Rejestracja zakończona sukcesem!');
      navigate('/login');
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
        (error.response?.data?.errors?.[0]?.msg || 'Wystąpił błąd podczas rejestracji.')
      );
    }
  };

  return (
    <div className='auth-body'>
      <form className='auth-form' onSubmit={handleSubmit}>
        <h1 className='auth-h1'>Rejestracja</h1>
        <input
          type="text"
          placeholder="Nazwa użytkownika"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          required
        />
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
        <input
          type="password"
          placeholder="Potwierdź hasło"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          required
        />
        {/* {errors.length > 0 && (
          <ul style={{ color: 'red' }}>
            {errors.map((err, index) => (
              <li key={index}>{err.msg}</li>
            ))}
          </ul>
        )} */}
        {errorMessage && <p className="auth-error">{errorMessage}</p>}
        <button type="submit">Zarejestruj się</button>
      </form>
    </div>
  );
};

export default Register;
