import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Hasła muszą być takie same.');
      return;
    }
    try {
      await axios.post('http://localhost:5000/auth/register', formData);
      alert('Rejestracja zakończona sukcesem!');
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        alert('Wystąpił błąd podczas rejestracji.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Rejestracja</h1>
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
      {errors.length > 0 && (
        <ul style={{ color: 'red' }}>
          {errors.map((err, index) => (
            <li key={index}>{err.msg}</li>
          ))}
        </ul>
      )}
      <button type="submit">Zarejestruj się</button>
    </form>
  );
};

export default Register;
