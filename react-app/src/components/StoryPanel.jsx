import React from 'react';
import Brand from './Brand.jsx';

export default function StoryPanel({ mode = 'login' }) {
  const steps = mode === 'register'
    ? ['Regístrate con tus datos universitarios', 'Confirma tu correo electrónico', 'Conecta y ayuda a la comunidad']
    : ['Publica o busca un objeto', 'Envía una solicitud segura', 'Coordina la entrega por chat'];

  return (
    <aside className="story">
      <Brand />
      <div className="campus-art" aria-hidden="true" />
      <div className="story-content">
        <div className="eyebrow">COMUNIDAD UDB</div>
        <h1>Lo que se pierde, puede volver.</h1>
        <p className="story-copy">
          {mode === 'register'
            ? 'Únete para publicar objetos, encontrar pertenencias y coordinar su entrega con la comunidad universitaria.'
            : 'Un espacio para reportar objetos, conectar con quien los encontró y coordinar su recuperación en el campus.'}
        </p>
        <div className="steps">
          {steps.map((step, index) => (
            <div className="step" key={step}>
              <span className="step-number">{index + 1}</span>{step}
            </div>
          ))}
        </div>
      </div>
      <div className="story-foot">BackToMe · Objetos perdidos y encontrados</div>
    </aside>
  );
}
