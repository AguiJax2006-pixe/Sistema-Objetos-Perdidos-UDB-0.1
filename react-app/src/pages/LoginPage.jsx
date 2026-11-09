import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout.jsx';
import FormField from '../components/FormField.jsx';
import PasswordToggle from '../components/PasswordToggle.jsx';
import Alert from '../components/Alert.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';

const API_AUTH_URL = import.meta.env.VITE_API_AUTH_URL || 'http://localhost:3000/api/auth';

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ correo: '', carnet: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage('');
    const correo = form.correo.trim();
    const carnet = form.carnet.trim();

    if (!correo) return setMessage('Por favor ingresa tu correo.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) return setMessage('Ingresa un correo electrónico válido.');
    if (!carnet) return setMessage('Por favor ingresa tu carnet estudiantil.');
    if (!form.password.trim()) return setMessage('Por favor ingresa tu contraseña.');

    setLoading(true);
    try {
      const response = await fetch(`${API_AUTH_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, carnet, password: form.password })
      });
      const result = await response.json();
      if (!response.ok) {
        setMessage(result.mensaje || 'No se pudo iniciar sesión.');
        return;
      }

      const session = { ...result.usuario, apiToken: result.token, origenAutenticacion: 'api' };
      localStorage.setItem('sesionActual', JSON.stringify(session));

      let users = [];
      try {
        const stored = JSON.parse(localStorage.getItem('usuarios') || '[]');
        users = Array.isArray(stored) ? stored.filter(item => item && typeof item === 'object').map(({ password, ...profile }) => profile) : [];
      } catch { users = []; }
      users = users.filter(item => String(item.id) !== String(result.usuario.id));
      users.push(result.usuario);
      localStorage.setItem('usuarios', JSON.stringify(users));
      navigate('/dashboard.html');
    } catch {
      setMessage('No se pudo conectar con BackToMe. Confirma que el servidor esté activo.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout mode="login">
      <div className="form-icon" aria-hidden="true">⌂</div>
      <h2>Bienvenido de nuevo</h2>
      <p className="form-lead">Inicia sesión con tus datos universitarios para continuar.</p>
      <Alert message={message} />
      <form onSubmit={handleSubmit} noValidate>
        <FormField id="correo" label="Correo electrónico" type="email" value={form.correo} onChange={update} placeholder="nombre@udb.edu.sv" autoComplete="email" />
        <FormField id="carnet" label="Carnet estudiantil" value={form.carnet} onChange={update} placeholder="Tu carnet" autoComplete="username" />
        <FormField id="password" label="Contraseña" type={showPassword ? 'text' : 'password'} value={form.password} onChange={update} placeholder="Ingresa tu contraseña" autoComplete="current-password">
          <PasswordToggle visible={showPassword} onToggle={() => setShowPassword(!showPassword)} />
        </FormField>
        <PrimaryButton loading={loading}>Iniciar sesión&nbsp; →</PrimaryButton>
      </form>
      <p className="form-switch">¿Primera vez en BackToMe? <Link to="/registro">Crear una cuenta</Link></p>
    </AuthLayout>
  );
}
