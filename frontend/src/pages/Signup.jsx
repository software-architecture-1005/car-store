import React, { useState } from 'react';
import './Auth.css';
import { signup } from '../services/authService';

const Signup = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await signup({ username: name, email, password });
      setSuccess(true);
      // Redirigir al login después del registro exitoso
      setTimeout(() => {
        if (onNavigate) {
          onNavigate('login');
        }
      }, 2000);
    } catch (err) {
      setError('Error al crear la cuenta. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <section className="auth-page">
        <div className="auth-container">
          <h1 className="auth-title">¡Cuenta creada!</h1>
          <div className="success-message">
            <p>Tu cuenta ha sido creada exitosamente.</p>
            <p>Redirigiendo al login...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="auth-page">
      <div className="auth-container">
        <h1 className="auth-title">Crear cuenta</h1>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label>Nombre completo</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Tu nombre completo"
              required 
            />
          </div>
          
          <div className="form-field">
            <label>Correo electrónico</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="tu@email.com"
              required 
            />
          </div>
          
          <div className="form-field">
            <label>Contraseña</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="••••••••"
              required 
            />
          </div>
          
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Creando...' : 'Crear cuenta'}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>¿Ya tienes cuenta? 
            <button 
              className="link-button" 
              onClick={() => onNavigate && onNavigate('login')}
            >
              Inicia sesión aquí
            </button>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Signup;


