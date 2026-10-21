export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  occupation: 'Doctor' | 'Student' | 'Engineer' | 'Scientist';
  gender: 'Male' | 'Female';
  password: string;
}

/**
 * Construit un utilisateur avec un email unique à chaque appel
 * (le site refuse les emails déjà enregistrés).
 */
export function buildUser(overrides: Partial<UserData> = {}): UserData {
  const unique = `${Date.now()}${Math.floor(Math.random() * 1000)}`;

  return {
    firstName: 'John',
    lastName: 'Doe',
    email: `johndoe.${unique}@gmail.com`,
    phone: '1234567890', // 10 chiffres, sans tirets
    occupation: 'Engineer',
    gender: 'Male',
    password: 'Test@12345', // le site exige au moins 8 caractères
    ...overrides,
  };
}
