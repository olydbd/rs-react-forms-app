import type { InputHTMLAttributes } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

type AutocompleteFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  register?: UseFormRegisterReturn;
  options: string[];
};

export default function AutocompleteField({
  id,
  label,
  error,
  register,
  options,
  ...rest
}: AutocompleteFieldProps) {
  return (
    <>
      {label && <label htmlFor={id}>{label} *</label>}
      <input
        list="country-list"
        id={id}
        {...register}
        {...rest}
        className="block h-8 w-full rounded-md border border-gray-300"
      />
      <datalist id="country-list">
        {options.map((option) => (
          <option key={option} value={option} />
        ))}
      </datalist>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </>
  );
}
