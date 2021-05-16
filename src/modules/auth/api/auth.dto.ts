/**
 * Interface for signing up a care giver
 */
export interface SignUpCareGiverDto {
  full_name: string;
  email: string;
  phone_number: string;
  password: string;
  country: string;
  state: string;
  city: string;
  address: string;
}