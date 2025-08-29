import type { InputHTMLAttributes } from 'react';

type FileFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export default function FileField({
  id,
  label,
  error,
  ...rest
}: FileFieldProps) {
  return (
    <>
      {label && <label htmlFor={id}>{label} *</label>}
      <input
        id={id}
        type="file"
        {...rest}
        className="block w-full cursor-pointer text-sm text-gray-700 file:mr-4 file:cursor-pointer file:rounded-lg file:border file:border-pink-600 file:px-4 file:py-2 file:text-pink-600 hover:file:border-gray-700 hover:file:text-gray-700"
      />
      <p className="h-5 text-sm text-red-600">{error}</p>
    </>
  );
}
