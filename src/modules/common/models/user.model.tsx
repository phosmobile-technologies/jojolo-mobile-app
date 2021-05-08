export interface User {
  id: number;
  uuid: string;
  full_name: string;
  profile_image: string;
  role: UserRole;
  number_of_points: number;
}

export enum UserRole {
  GUARDIAN = "GUARDIAN",
  MOTHER = "MOTHER",
  FATHER = "FATHER",
}

export enum HealthProfessionalRole {
  PEDEATRICIAN = "PEDEATRICIAN",
  GENERAL_PRACTITIONER = "GENERAL_PRACTITIONER",
  DENTIST = "DENTIST",
  LACTATIONIST = "LACTATIONIST",
  DERMATOLOGIST = "DERMATOLOGIST",
  THERAPIST = "THERAPIST",
  NUTRITIONIST = "NUTRITIONIST",
}
