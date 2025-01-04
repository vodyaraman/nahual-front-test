import React from 'react';
import "./FormInput.scss"

interface FormInputProps {
  id: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  label: string;
}

const FormInput: React.FC<FormInputProps> = ({ id, type, value, onChange, error, label }) => {
  return (
    <div className="form-field">
      <input id={id} type={type} placeholder=" " value={value} onChange={onChange} />
      <label htmlFor={id}>
        {error ? <div className="form-error">{error}</div> : <>{label}</>}
      </label>
    </div>
  );
};

export default FormInput;
