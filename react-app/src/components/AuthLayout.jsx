import React from 'react';
import Brand from './Brand.jsx';
import StoryPanel from './StoryPanel.jsx';
import ThemeToggle from './ThemeToggle.jsx';

export default function AuthLayout({ mode, children }) {
  return (
    <main className="auth-layout">
      <StoryPanel mode={mode} />
      <ThemeToggle />
      <section className="form-side">
        <div className={`form-wrap ${mode === 'register' ? 'register-wrap' : ''}`}>
          <Brand mobile />
          {children}
        </div>
      </section>
    </main>
  );
}
