import { useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { genderOptions } from '../../utils/constants';
import AutocompleteField from '../ui/AutocompleteField/AutocompleteField';
import CheckboxField from '../ui/CheckboxField/CheckboxField';
import InputField from '../ui/InputField/InputField';
import SelectField from '../ui/SelectField/SelectField';
import { schema, type Schema } from '../../utils/validation';
import { addUncontrolledData } from '../../features/formData/formDataSlice';

interface ControlledFormProps {
  onClose: () => void;
}

export default function UncontrolledForm({ onClose }: ControlledFormProps) {
  const countries = useAppSelector((state) => state.countries);
  const dispatch = useAppDispatch();

  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof Schema, string>>>(
    {},
  );

  const pictureBase64Ref = useRef<string>('');
  const handlePictureChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      pictureBase64Ref.current = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(e.currentTarget);
    const formValues = {
      name: formData.get('name'),
      age: formData.get('age'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirm: formData.get('confirm'),
      gender: formData.get('gender'),
      country: formData.get('country'),
      terms: formData.get('terms') === 'on',
      picture: pictureBase64Ref.current,
    };

    const parsed = schema.safeParse(formValues);

    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof Schema, string>> = {};
      parsed.error.issues.forEach((err) => {
        const field = err.path[0] as keyof Schema;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    dispatch(addUncontrolledData(parsed.data));
    onClose();
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div className="mb-4">
        <InputField id="name" label="Name" name="name" error={errors.name} />
      </div>

      <div className="mb-4">
        <InputField id="age" label="Age" name="age" error={errors.age} />
      </div>

      <div className="mb-4">
        <InputField
          id="email"
          label="Email"
          name="email"
          error={errors.email}
        />
      </div>

      <div className="mb-4">
        <InputField
          id="password"
          label="Password"
          name="password"
          error={errors.confirm}
        />
      </div>

      <div className="mb-4">
        <InputField
          id="confirm"
          label="Confirm"
          name="confirm"
          error={errors.confirm}
        />
      </div>

      <div className="mb-4">
        <SelectField
          id="gender"
          label="Gender"
          name="gender"
          options={genderOptions}
          error={errors.gender}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="picture" className="mb-1 block">
          Upload Picture
        </label>
        <input
          id="picture"
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          name="picture"
          className="block w-full cursor-pointer text-sm text-gray-700 file:mr-4 file:cursor-pointer file:rounded-lg file:border file:border-pink-600 file:px-4 file:py-2 file:text-pink-600 hover:file:border-gray-700 hover:file:text-gray-700"
          onChange={handlePictureChange}
        />
      </div>

      <div className="mb-4">
        <AutocompleteField
          id="country"
          label="Country"
          name="country"
          options={countries}
          error={errors.country}
        />
      </div>

      <div className="mb-4">
        <CheckboxField
          id="terms"
          label="Accept T&C"
          name="terms"
          error={errors.terms}
        />
      </div>

      <button
        type="submit"
        className="cursor-pointer rounded-2xl bg-pink-600 px-4 py-2 text-sm font-bold text-white hover:bg-pink-700"
      >
        Submit
      </button>
    </form>
  );
}
