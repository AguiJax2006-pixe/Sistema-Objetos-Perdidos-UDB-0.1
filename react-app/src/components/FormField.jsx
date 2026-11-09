import React from 'react';

export default function FormField({
  id, label, value, onChange, placeholder, type = 'text',
  autoComplete, required = true, children, ...props
}) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <div className={children ? 'password-field' : undefined}>
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          {...props}
        />
        {children}
      </div>
    </div>
  );
}
