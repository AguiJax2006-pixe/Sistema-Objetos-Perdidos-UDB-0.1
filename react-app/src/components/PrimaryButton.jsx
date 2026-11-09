import React from 'react';

export default function PrimaryButton({ children, loading = false, ...props }) {
  return <button className="primary-button" type="submit" disabled={loading} {...props}>
    {loading ? 'Procesando…' : children}
  </button>;
}
