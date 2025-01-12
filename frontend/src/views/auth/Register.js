import React, { useState } from 'react';
import axiosInstance from '../../services/axiosInstance';
import { useNavigate, Link } from 'react-router-dom';
import "../../styles/Auth.css";
import Swal from "sweetalert2";

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Hasła muszą być takie same.");
      Swal.fire({
        icon: "warning",
        title: "Błąd",
        text: "Hasła muszą być takie same.",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      await axiosInstance.post("http://localhost:5000/auth/register", formData);

      Swal.fire({
        icon: "success",
        title: "Sukces",
        text: "Rejestracja zakończona sukcesem!",
        confirmButtonText: "Przejdź do logowania",
      }).then(() => {
        navigate("/login");
      });

    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.errors?.[0]?.msg ||
        "Wystąpił błąd podczas rejestracji.";

      Swal.fire({
        icon: "error",
        title: "Błąd",
        text: errorMessage,
        confirmButtonText: "OK",
      });

      setErrorMessage(errorMessage);
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
        {errorMessage && <p className="auth-error">{errorMessage}</p>}
        <button type="submit">Zarejestruj się</button>
        <Link to="/" className="btn-back-to-home">
          Powrót do strony głównej
        </Link>
      </form>
    </div>
  );
};

export default Register;
