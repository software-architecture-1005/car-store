import React, { useState } from 'react';
import './Auth.css';
import { login } from '../services/authService';
import { useAuth } from '../contexts/AuthContext';

const Login = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login: authLogin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await login({ username: email, password });
      authLogin({ isAuthenticated: true, email });
      // Redirigir al home después del login exitoso
      if (onNavigate) {
        onNavigate('home');
      }
    } catch (err) {
      setError('Credenciales incorrectas. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-container">
        <h1 className="auth-title">Iniciar sesión</h1>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label>Nombre de usuario o Email</label>
            <input 
              type="text" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="usuario o email@ejemplo.com"
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
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>¿No tienes cuenta? 
            <button 
              className="link-button" 
              onClick={() => onNavigate && onNavigate('signup')}
            >
              Regístrate aquí
            </button>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;


