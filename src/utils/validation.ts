import z from 'zod';

export const schema = z
  .object({
    name: z
      .string()
      .min(1, 'Required field')
      .regex(/^[A-Z]/, 'Name must start with an uppercase letter'),

    age: z
      .string()
      .min(1, 'Required field')
      .refine(
        (val) => !isNaN(Number(val)) && Number(val) >= 0,
        'Age must be a positive number',
      ),

    email: z
      .string()
      .min(1, 'Required field')
      .regex(/^(\S|$)/, 'Must not contain leading whitespace(s)')
      .regex(/.*\S$|^$/, 'Must not contain trailing whitespace(s)')
      .regex(
        /\b(?:[a-z0-9-]+\.)+[a-z]{2,}\b/,
        'Must contain a domain name (e.g., example.com)',
      )
      .regex(/^[^@]+@[^@]+$/, 'Must contain a separating "@" symbol'),

    password: z
      .string()
      .min(1, 'Required field')
      .regex(/[A-Z]/g, 'At least one uppercase letter (A-Z)')
      .regex(/[a-z]/g, 'At least one lowercase letter (a-z)')
      .regex(/[0-9]/g, 'At least one digit (0-9)')
      .regex(/[!@#$%^&*]/g, 'At least one special character (e.g., !@#$%^&*)')
      .regex(/^(\S|$)/, 'Must not contain leading whitespace(s)')
      .regex(/.*\S$|^$/, 'Must not contain trailing whitespace(s)'),

    confirm: z.string().min(1, 'Required field'),

    gender: z.enum(['female', 'male', 'other'], 'Please select your gender'),

    terms: z.literal(true, 'You must accept the terms and conditions'),

    picture: z
      .file('Please upload a file')
      .refine(
        (file) => file.size <= 2 * 1024 * 1024,
        'File must be smaller than 2MB',
      )
      .refine(
        (file) => ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type),
        'Only JPEG, JPG, PNG files are allowed',
      ),

    country: z.string().min(1, 'Required field'),
  })
  .refine((data) => data.password === data.confirm, {
    message: 'Passwords do not match',
    path: ['confirm'],
  });

export type Schema = z.infer<typeof schema>;
