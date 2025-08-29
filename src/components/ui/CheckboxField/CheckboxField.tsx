import type { InputHTMLAttributes } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  register?: UseFormRegisterReturn;
};

export default function CheckboxField({
  id,
  label,
  error,
  register,
  ...rest
}: InputFieldProps) {
  return (
    <>
      <input id={id} type="checkbox" {...register} {...rest} className="mr-2" />
      {label && (
        <label htmlFor={id} className="text-sm text-gray-700">
          {label} *
        </label>
      )}
      <p className="h-2 text-sm text-red-600">{error}</p>
    </>
  );
}
