import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout.jsx';
import FormField from '../components/FormField.jsx';
import Alert from '../components/Alert.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';

const API_AUTH_URL = import.meta.env.VITE_API_AUTH_URL || 'http://localhost:3000/api/auth';

export default function ForgotPasswordPage() {
  const [correo, setCorreo] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('error');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage('');
    setMessageType('error');
    const correoNormalizado = correo.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoNormalizado)) {
      setMessage('Ingresa un correo electrónico válido.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_AUTH_URL}/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo: correoNormalizado })
      });
      const result = await response.json();
      if (!response.ok) {
        setMessage(result.mensaje || 'No se pudo procesar la solicitud.');
        return;
      }
      setMessageType('success');
      setMessage(result.mensaje || 'Si existe una cuenta con ese correo, recibirás un enlace para restablecer la contraseña.');
    } catch {
      setMessage('No se pudo conectar con BackToMe. Confirma que el servidor esté activo.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout mode="login">
      <div className="form-icon" aria-hidden="true">?</div>
      <h2>Recupera tu contraseña</h2>
      <p className="form-lead">Escribe el correo de tu cuenta y te enviaremos un enlace para crear una contraseña nueva.</p>
      <Alert message={message} type={messageType} />
      <form onSubmit={handleSubmit} noValidate>
        <FormField
          id="correo"
          label="Correo electrónico"
          type="email"
          value={correo}
          onChange={(event) => setCorreo(event.target.value)}
          placeholder="nombre@udb.edu.sv"
          autoComplete="email"
        />
        <PrimaryButton loading={loading}>Enviar enlace</PrimaryButton>
      </form>
      <p className="form-switch"><Link to="/login">Volver a iniciar sesión</Link></p>
    </AuthLayout>
  );
}
