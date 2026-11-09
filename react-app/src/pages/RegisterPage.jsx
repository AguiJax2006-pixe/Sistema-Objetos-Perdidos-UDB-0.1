import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout.jsx';
import FormField from '../components/FormField.jsx';
import PasswordToggle from '../components/PasswordToggle.jsx';
import Alert from '../components/Alert.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';

const API_AUTH_URL = import.meta.env.VITE_API_AUTH_URL || 'http://localhost:3000/api/auth';

export default function RegisterPage() {
  const [form, setForm] = useState({
    nombre: '', apellido: '', carnet: '', carrera: '', correo: '', password: '', confirmarPassword: ''
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('error');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage('');
    const data = {
      nombre: form.nombre.trim(),
      apellido: form.apellido.trim(),
      carnet: form.carnet.trim(),
      carrera: form.carrera.trim(),
      correo: form.correo.trim(),
      password: form.password
    };

    if (!data.nombre || !data.apellido || !data.carnet || !data.carrera || !data.correo || !data.password || !form.confirmarPassword) {
      setMessage('Todos los campos son obligatorios.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.correo)) {
      setMessage('Ingresa un correo electrónico válido.');
      return;
    }
    if (data.password.length < 8) {
      setMessage('La contraseña debe tener al menos 8 caracteres.');
      return;
    }
    if (data.password !== form.confirmarPassword) {
      setMessage('Las contraseñas no coinciden.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_AUTH_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      if (!response.ok) {
        setMessage(result.mensaje || 'No se pudo crear la cuenta.');
        return;
      }
      setForm({ nombre: '', apellido: '', carnet: '', carrera: '', correo: '', password: '', confirmarPassword: '' });
      setMessageType('success');
      setMessage(result.mensaje || 'Tu cuenta fue creada. Revisa tu correo para verificarla.');
    } catch {
      setMessage('No se pudo conectar con BackToMe. Confirma que el servidor esté activo.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout mode="register">
      <div className="form-icon" aria-hidden="true">＋</div>
      <h2>Crea tu cuenta</h2>
      <p className="form-lead">Regístrate con tu información universitaria.</p>
      <Alert message={message} type={messageType} />
      <form onSubmit={handleSubmit} noValidate>
        <div className="field-grid">
          <FormField id="nombre" label="Nombre" value={form.nombre} onChange={update} placeholder="Nombre" autoComplete="given-name" />
          <FormField id="apellido" label="Apellido" value={form.apellido} onChange={update} placeholder="Apellido" autoComplete="family-name" />
          <FormField id="carnet" label="Carnet estudiantil" value={form.carnet} onChange={update} placeholder="Tu carnet" />
          <FormField id="carrera" label="Carrera" value={form.carrera} onChange={update} placeholder="Tu carrera" />
        </div>
        <FormField id="correo" label="Correo electrónico" type="email" value={form.correo} onChange={update} placeholder="nombre@udb.edu.sv" autoComplete="email" />
        <div className="field-grid">
          <FormField id="password" label="Contraseña" type={showPassword ? 'text' : 'password'} value={form.password} onChange={update} placeholder="Crea una contraseña" autoComplete="new-password">
            <PasswordToggle visible={showPassword} onToggle={() => setShowPassword(!showPassword)} />
          </FormField>
          <FormField id="confirmarPassword" label="Confirmar contraseña" type={showConfirm ? 'text' : 'password'} value={form.confirmarPassword} onChange={update} placeholder="Repite la contraseña" autoComplete="new-password">
            <PasswordToggle visible={showConfirm} onToggle={() => setShowConfirm(!showConfirm)} />
          </FormField>
        </div>
        <p className="verify-note">Al crear tu cuenta, te enviaremos un enlace para verificar tu correo electrónico.</p>
        <PrimaryButton loading={loading}>Crear cuenta&nbsp; →</PrimaryButton>
      </form>
      <p className="form-switch">¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
    </AuthLayout>
  );
}
