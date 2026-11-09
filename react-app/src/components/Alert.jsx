import React from 'react';

export default function Alert({ message, type = 'error' }) {
  if (!message) return null;
  return <div className={`alert alert-${type} show`} role={type === 'error' ? 'alert' : 'status'}>{message}</div>;
}
