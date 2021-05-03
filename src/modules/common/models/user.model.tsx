export interface User {
  id: number;
  uuid: string;
  full_name: string;
  profile_image: string;
  role: UserRole;
  number_of_points: number;
}

export enum UserRole {
  GUARDIAN,
  MOTHER,
  FATHER,
  PEDEATRICIAN,
  GENERAL_PRACTITIONER,
  DENTIST,
  LACTATIONIST,
  DERMATOLOGIST,
  THERAPIST,
  NUTRITIONNIST,
}
