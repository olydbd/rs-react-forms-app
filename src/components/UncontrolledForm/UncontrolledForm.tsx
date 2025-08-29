import { useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { genderOptions } from '../../utils/constants';
import AutocompleteField from '../ui/AutocompleteField/AutocompleteField';
import CheckboxField from '../ui/CheckboxField/CheckboxField';
import InputField from '../ui/InputField/InputField';
import SelectField from '../ui/SelectField/SelectField';
import { schema, type Schema } from '../../utils/validation';
import { addUncontrolledData } from '../../features/formData/formDataSlice';
import fileToBase64 from '../../utils/fileToBase64';
import FileField from '../ui/FileField/FileField';

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

  const pictureFileRef = useRef<File | null>(null);

  const handlePictureChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      pictureFileRef.current = file;
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
      picture: pictureFileRef.current,
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

    const base64 = await fileToBase64(parsed.data.picture as File);

    const storeData = {
      ...parsed.data,
      picture: base64,
    };

    dispatch(addUncontrolledData(storeData));
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
        <FileField
          id="picture"
          label="Upload Picture"
          error={errors.picture}
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
          label="I accept the Terms and Conditions"
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
