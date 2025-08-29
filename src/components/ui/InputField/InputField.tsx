import type { InputHTMLAttributes } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  register?: UseFormRegisterReturn;
};

export default function InputField({
  id,
  label,
  error,
  register,
  ...rest
}: InputFieldProps) {
  return (
    <>
      {label && <label htmlFor={id}>{label} *</label>}
      <input
        id={id}
        type="text"
        {...register}
        {...rest}
        className="block h-8 w-full rounded-md border border-gray-300"
      />
      {error !== 'none' && <p className="h-2 text-sm text-red-600">{error}</p>}
    </>
  );
}
