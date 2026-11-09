import React from 'react';

export default function Brand({ mobile = false }) {
  return (
    <a className={`brand ${mobile ? 'mobile-brand' : ''}`} href="/login">
      <img src="/imagenes.img/logo-udb.png" alt="Universidad Don Bosco" />
      <span className="brand-name">Back<span>To</span>Me</span>
    </a>
  );
}
