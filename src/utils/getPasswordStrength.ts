export default function getPasswordStrength(password: string): number {
  let strength = 0;
  if (/[0-9]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[!@#$%^&*]/.test(password)) strength++;
  return strength;
}
