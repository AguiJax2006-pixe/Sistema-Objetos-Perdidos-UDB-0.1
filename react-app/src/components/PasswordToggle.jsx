import React, { useState } from 'react';

export default function PasswordToggle({ visible, onToggle }) {
  return (
    <button
      className="password-toggle"
      type="button"
      onClick={onToggle}
      aria-label={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
      aria-pressed={visible}
    ><span aria-hidden="true">👁</span></button>
  );
}
