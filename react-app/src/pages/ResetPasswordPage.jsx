import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout.jsx';
import FormField from '../components/FormField.jsx';
import PasswordToggle from '../components/PasswordToggle.jsx';
import Alert from '../components/Alert.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';

const API_AUTH_URL = import.meta.env.VITE_API_AUTH_URL || 'http://localhost:3000/api/auth';

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const tokenValido = /^[a-f0-9]{64}$/i.test(token);
  const [password, setPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('error');
  const [loading, setLoading] = useState(false);
  const [actualizada, setActualizada] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage('');
    if (password.length < 8 || password.length > 128) {
      setMessage('La contraseña debe tener entre 8 y 128 caracteres.');
      return;
    }
    if (password !== confirmarPassword) {
      setMessage('Las contraseñas no coinciden.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_AUTH_URL}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password })
      });
      const result = await response.json();
      if (!response.ok) {
        setMessage(result.mensaje || 'No se pudo actualizar la contraseña.');
        return;
      }
      setPassword('');
      setConfirmarPassword('');
      setActualizada(true);
      setMessageType('success');
      setMessage(result.mensaje || 'Contraseña actualizada. Ya puedes iniciar sesión.');
    } catch {
      setMessage('No se pudo conectar con BackToMe. Confirma que el servidor esté activo.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout mode="login">
      <div className="form-icon" aria-hidden="true">✓</div>
      <h2>Elige una contraseña nueva</h2>
      <p className="form-lead">Usa una contraseña de al menos 8 caracteres.</p>
      {!tokenValido ? (
        <>
          <Alert message="El enlace no es válido. Solicita uno nuevo para continuar." />
          <p className="form-switch"><Link to="/olvidaste-contrasena">Solicitar otro enlace</Link></p>
        </>
      ) : (
        <>
          <Alert message={message} type={messageType} />
          {!actualizada ? (
            <form onSubmit={handleSubmit} noValidate>
              <FormField id="password" label="Contraseña nueva" type={showPassword ? 'text' : 'password'} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Crea una contraseña" autoComplete="new-password">
                <PasswordToggle visible={showPassword} onToggle={() => setShowPassword(!showPassword)} />
              </FormField>
              <FormField id="confirmarPassword" label="Confirmar contraseña" type={showConfirm ? 'text' : 'password'} value={confirmarPassword} onChange={(event) => setConfirmarPassword(event.target.value)} placeholder="Repite la contraseña" autoComplete="new-password">
                <PasswordToggle visible={showConfirm} onToggle={() => setShowConfirm(!showConfirm)} />
              </FormField>
              <PrimaryButton loading={loading}>Guardar contraseña</PrimaryButton>
            </form>
          ) : (
            <p className="form-switch"><Link to="/login">Ir a iniciar sesión</Link></p>
          )}
        </>
      )}
    </AuthLayout>
  );
}
