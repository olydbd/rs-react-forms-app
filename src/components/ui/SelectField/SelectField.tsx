import type { SelectHTMLAttributes } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

interface Option {
  value: string;
  label: string;
}

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  register?: UseFormRegisterReturn;
  options: Option[];
};

export default function SelectField({
  id,
  label,
  error,
  register,
  options,
  ...rest
}: SelectFieldProps) {
  return (
    <>
      {label && <label htmlFor={id}>{label} *</label>}
      <select
        id={id}
        className="block h-9 w-full rounded-md border border-gray-300 text-gray-700"
        {...register}
        {...rest}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="text-sm">
            {option.label}
          </option>
        ))}
      </select>
      <p className="h-2 text-sm text-red-600">{error}</p>
    </>
  );
}
