import { useForm } from 'react-hook-form';
import { schema, type Schema } from '../../utils/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '../ui/InputField/InputField';
import SelectField from '../ui/SelectField/SelectField';
import { genderOptions } from '../../utils/constants';
import CheckboxField from '../ui/CheckboxField/CheckboxField';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import type { ChangeEvent } from 'react';
import AutocompleteField from '../ui/AutocompleteField/AutocompleteField';
import { addControlledData } from '../../features/formData/formDataSlice';
import fileToBase64 from '../../utils/fileToBase64';
import FileField from '../ui/FileField/FileField';

interface ControlledFormProps {
  onClose: () => void;
}

export default function ControlledForm({ onClose }: ControlledFormProps) {
  const countries = useAppSelector((state) => state.countries);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const handlePictureChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setValue('picture', file, { shouldValidate: true });
    }
  };

  const onSubmit = async (data: Schema) => {
    const base64 = await fileToBase64(data.picture as File);

    const storeData = {
      ...data,
      picture: base64,
    };

    dispatch(addControlledData(storeData));
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <InputField
          id="name"
          label="Name"
          error={errors.name?.message}
          {...register('name')}
        />
      </div>

      <div className="mb-4">
        <InputField
          id="age"
          label="Age"
          error={errors.age?.message}
          {...register('age')}
        />
      </div>

      <div className="mb-4">
        <InputField
          id="email"
          label="Email"
          error={errors.email?.message}
          {...register('email')}
        />
      </div>

      <div className="mb-4">
        <InputField
          id="password"
          label="Password"
          error={errors.password?.message}
          {...register('password')}
        />
      </div>

      <div className="mb-4">
        <InputField
          id="confirm"
          label="Confirm"
          error={errors.confirm?.message}
          {...register('confirm')}
        />
      </div>

      <div className="mb-4">
        <SelectField
          id="gender"
          label="Gender"
          error={errors.gender?.message}
          {...register('gender')}
          options={genderOptions}
        />
      </div>

      <div className="mb-4">
        <FileField
          id="picture"
          label="Upload Picture"
          error={errors.picture?.message}
          onChange={handlePictureChange}
        />
      </div>

      <div className="mb-4">
        <AutocompleteField
          id="country"
          label="Country"
          error={errors.country?.message}
          {...register('country')}
          options={countries}
        />
      </div>

      <div className="mb-4">
        <CheckboxField
          id="terms"
          label="I accept the Terms and Conditions"
          error={errors.terms?.message}
          {...register('terms')}
        />
      </div>

      <button
        type="submit"
        disabled={!isValid}
        className={`rounded-2xl bg-pink-600 px-4 py-2 text-sm font-bold text-white ${!isValid ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-pink-700'}`}
      >
        Submit
      </button>
    </form>
  );
}
