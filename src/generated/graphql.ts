import { GraphQLClient } from 'graphql-request';
import { useMutation, UseMutationOptions } from 'react-query';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(client: GraphQLClient, query: string, variables?: TVariables) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables);
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

/** The birth term of a child */
export enum BirthTerm {
  NotSure = 'NOT_SURE',
  PostTerm = 'POST_TERM',
  PreTerm = 'PRE_TERM',
  Term = 'TERM'
}

/** Human blood group */
export enum BloodGroup {
  A = 'A',
  Ab = 'AB',
  B = 'B',
  O = 'O'
}

export type CareGiverProfile = {
  __typename?: 'CareGiverProfile';
  /** The care giver's address */
  address: Scalars['String'];
  /** The children added by the care giver */
  children: Array<Maybe<Child>>;
  /** The care giver's city */
  city: Scalars['String'];
  /** The care giver's country */
  country: Scalars['String'];
  /** The date and time when the care giver profile was created */
  created_at: Scalars['DateTime'];
  /** The care giver profile id */
  id: Scalars['Int'];
  /** The care giver's role */
  role: CareGiverRole;
  /** The care giver's state */
  state: Scalars['String'];
  /** The date and time when the care giver profile was last updated */
  updated_at: Scalars['DateTime'];
  /** The care giver's user account */
  user: User;
  /** The care giver profile uuid */
  uuid: Scalars['ID'];
};

/** The roles that caregivers can have */
export enum CareGiverRole {
  Father = 'FATHER',
  Guardian = 'GUARDIAN',
  Mother = 'MOTHER'
}

/** Model for a child added by a caregiver */
export type Child = {
  __typename?: 'Child';
  /** A list of allergies that the child has */
  allergies: Array<Scalars['String']>;
  /** The child's birth term */
  birth_term: BirthTerm;
  /** The child's blood group */
  blood_group: BloodGroup;
  /** The child's date of birth */
  date_of_birth: Scalars['DateTime'];
  /** The child's first name */
  first_name: Scalars['String'];
  /** The child's gender */
  gender: Gender;
  /** The child's genotype */
  genotype: Genotype;
  /** Indicates if the child has allergies */
  has_allergies: Scalars['Boolean'];
  /** Indicates if the child has any medical condition */
  has_medical_conditions: Scalars['Boolean'];
  /** Indicates if the child has special needs */
  has_special_needs: Scalars['Boolean'];
  /** Indicates if the caregiver wants to track the child's growth */
  track_growth: Scalars['Boolean'];
  /** Indicates if the caregiver wants to track the child's immunizations */
  track_immunizations: Scalars['Boolean'];
  /** Indicates if the caregiver wants to track the child's milestones */
  track_milestones: Scalars['Boolean'];
};

/** Input used in creating a child when signing up a care giver account */
export type CreateCareGiverChildInput = {
  /** A list of allergies that the child has */
  allergies: Array<Scalars['String']>;
  /** The child's birth term */
  birth_term: BirthTerm;
  /** The child's blood group */
  blood_group: BloodGroup;
  /** The child's date of birth */
  date_of_birth: Scalars['DateTime'];
  /** The child's first name */
  first_name: Scalars['String'];
  /** The child's gender */
  gender: Gender;
  /** The child's genotype */
  genotype: Genotype;
  /** Indicates if the child has allergies */
  has_allergies: Scalars['Boolean'];
  /** Indicates if the child has any medical condition */
  has_medical_conditions: Scalars['Boolean'];
  /** Indicates if the child has special needs */
  has_special_needs: Scalars['Boolean'];
  /** Indicates if the caregiver wants to track the child's growth */
  track_growth: Scalars['Boolean'];
  /** Indicates if the caregiver wants to track the child's immunizations */
  track_immunizations: Scalars['Boolean'];
  /** Indicates if the caregiver wants to track the child's milestones */
  track_milestones: Scalars['Boolean'];
};

/** Input for creating a care giver account */
export type CreateCareGiverInput = {
  /** The user's address */
  address: Scalars['String'];
  /** Data for a child the caregiver wants to add while signing up */
  child?: Maybe<CreateCareGiverChildInput>;
  /** The user's city of residence */
  city: Scalars['String'];
  /** The user's country of residence */
  country: Scalars['String'];
  /** The user's email address */
  email: Scalars['String'];
  /** The user's full name */
  full_name: Scalars['String'];
  /** The user's password */
  password: Scalars['String'];
  /** The user's phone number */
  phone_number: Scalars['String'];
  /** The care giver's role */
  role: CareGiverRole;
  /** The user's state of residence */
  state: Scalars['String'];
};

export type CreateHealthCareProfessionalInput = {
  /** The user's email address */
  email: Scalars['String'];
  /** The user's full name */
  full_name: Scalars['String'];
  /** The user's password */
  password: Scalars['String'];
  /** The user's phone number */
  phone_number: Scalars['String'];
  /** The health care professional's role */
  role: HealthCareProfessionalRole;
  /** The verification files for the health care professional's profile */
  verification_files: Array<CreateHealthCareProfessionalVerificationFilesInput>;
  /** The health care professional's years of experience */
  years_of_experience: Scalars['Int'];
};

export type CreateHealthCareProfessionalVerificationFilesInput = {
  /** The base64 encoded file data */
  file_data: Scalars['String'];
  /** The kind of verification file being uploaded */
  type: HealthCareProfessionalVerificationFileType;
};

/** Input for posts */
export type CreatePostInput = {
  /** The post content */
  content: Scalars['String'];
  /** An array of base64 encoded strings of images added to the post */
  images: Array<Maybe<Scalars['String']>>;
  /** Indicates if the user wants to make the post anonymous */
  posted_anonymously: Scalars['Boolean'];
  /** An array of ids for the tags added to the post */
  tags: Array<Scalars['Int']>;
  /** The post title */
  title: Scalars['String'];
  /** The id of the user who owns the post */
  user_id: Scalars['Int'];
};


/** Input for finding a user based on unique values */
export type FindUserInput = {
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Float']>;
  uuid?: Maybe<Scalars['String']>;
};

/** Human Gender */
export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE'
}

/** Human genotype */
export enum Genotype {
  Aa = 'AA',
  Ac = 'AC',
  As = 'AS',
  Ss = 'SS'
}

export type HealthCareProfessionalProfile = {
  __typename?: 'HealthCareProfessionalProfile';
  /** The date and time when the health professional's profile was created */
  created_at: Scalars['DateTime'];
  /** The health professional's profile id */
  id: Scalars['Int'];
  /** The date and time when the health professional's profile was last updated */
  updated_at: Scalars['DateTime'];
  /** The health professional's user account */
  user: User;
  /** An array of the files uploaded by the health professional during account verification */
  verification_files: Array<HealthCareProfessionalVerificationFile>;
  /** The health professional's years of experience */
  years_of_experience: Scalars['Int'];
};

/** The roles that healthcare professionals can have */
export enum HealthCareProfessionalRole {
  Dentist = 'DENTIST',
  Dermatologist = 'DERMATOLOGIST',
  GeneralPractitioner = 'GENERAL_PRACTITIONER',
  Lactationist = 'LACTATIONIST',
  Nutritionist = 'NUTRITIONIST',
  Pedeatrician = 'PEDEATRICIAN',
  Therapist = 'THERAPIST'
}

export type HealthCareProfessionalVerificationFile = {
  __typename?: 'HealthCareProfessionalVerificationFile';
  /** The date and time when the file was uploaded */
  created_at: Scalars['DateTime'];
  /** The url of a file uploaded by a health professional during verification */
  file_url: Scalars['String'];
  /** The profile of the health professional who uploaded the file */
  health_professional_profile: HealthCareProfessionalProfile;
  /** The id of a file uploaded by a health professional during verification */
  id: Scalars['Int'];
  /** The type of file uploaded by a health professional during verification */
  type: HealthCareProfessionalVerificationFileType;
  /** The date and time when the file record was last updated */
  updated_at: Scalars['DateTime'];
};

/** The expected kinds of file uploads when verifying a health professionals account */
export enum HealthCareProfessionalVerificationFileType {
  MedicalLicense = 'MEDICAL_LICENSE',
  ValidId = 'VALID_ID'
}

/** Input used in logging in a user account */
export type LoginInput = {
  /** The email */
  email: Scalars['String'];
  /** The password */
  password: Scalars['String'];
};

/** Response returned after logging in */
export type LoginResponse = {
  __typename?: 'LoginResponse';
  /** The jwt access token */
  access_token: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Create a post */
  CreatePost: Post;
  /** Create a post tag */
  CreatePostTag: PostTag;
  /** Login a user */
  Login: LoginResponse;
  /** Create a user account for a caregiver */
  SignUpCareGiver: User;
  /** Create a user account for a health care professional */
  SignUpHealthCareProfessional: User;
};


export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


export type MutationCreatePostTagArgs = {
  input: PostTagInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationSignUpCareGiverArgs = {
  input: CreateCareGiverInput;
};


export type MutationSignUpHealthCareProfessionalArgs = {
  input: CreateHealthCareProfessionalInput;
};

/** Model for a post */
export type Post = {
  __typename?: 'Post';
  /** The post content */
  content: Scalars['String'];
  /** The files uploaded to the post */
  files: Array<Maybe<PostFileUpload>>;
  /** The post id */
  id: Scalars['Int'];
  /** Indicates if the post was posted anonymously or not */
  posted_anonymously: Scalars['Boolean'];
  /** The post's tags */
  tags: Array<Maybe<PostTag>>;
  /** The post title */
  title: Scalars['String'];
  /** The user who created the post */
  user: User;
  /** The post id */
  uuid: Scalars['String'];
};

/** Model for files uploaded to a post */
export type PostFileUpload = {
  __typename?: 'PostFileUpload';
  /** The url of the ile uploaded to the post */
  file_url: Scalars['String'];
  /** The id of the file uploaded to the post */
  id: Scalars['Int'];
};

/** Model for a post tag */
export type PostTag = {
  __typename?: 'PostTag';
  /** The tag id */
  id: Scalars['Int'];
  /** The tags name */
  name: Scalars['String'];
};

/** Input for post tags */
export type PostTagInput = {
  /** The name of the tag */
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  /** Find a user by their unique values like id, uuid or email */
  FindUser: User;
};


export type QueryFindUserArgs = {
  input: FindUserInput;
};

export type User = {
  __typename?: 'User';
  /** The user's care giver profile (if the user is a care giver) */
  care_giver_profile?: Maybe<CareGiverProfile>;
  /** The date and time when the user account was created */
  created_at: Scalars['DateTime'];
  /** The user's email address */
  email: Scalars['String'];
  /** The user's full name */
  full_name: Scalars['String'];
  /** The user's health care professional profile (if the user is a health care professional) */
  health_care_professional_profile?: Maybe<HealthCareProfessionalProfile>;
  /** The user's id */
  id: Scalars['Int'];
  /** The user's phone number */
  phone_number: Scalars['String'];
  /** The date and time when the user account was last updated */
  updated_at: Scalars['DateTime'];
  /** The user's type */
  user_type: UserType;
  /** The user's uuid */
  uuid: Scalars['ID'];
};

/** The types of users we have in the application domain */
export enum UserType {
  CareGiver = 'CARE_GIVER',
  HealthCareProfessional = 'HEALTH_CARE_PROFESSIONAL'
}

export type SignUpCareGiverMutationVariables = Exact<{
  input: CreateCareGiverInput;
}>;


export type SignUpCareGiverMutation = (
  { __typename?: 'Mutation' }
  & { SignUpCareGiver: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'uuid' | 'email' | 'full_name' | 'phone_number' | 'user_type' | 'created_at' | 'updated_at'>
    & { care_giver_profile?: Maybe<(
      { __typename?: 'CareGiverProfile' }
      & Pick<CareGiverProfile, 'id' | 'uuid' | 'country' | 'state' | 'city' | 'address' | 'role'>
      & { children: Array<Maybe<(
        { __typename?: 'Child' }
        & Pick<Child, 'first_name' | 'birth_term' | 'date_of_birth' | 'gender' | 'genotype' | 'blood_group' | 'has_allergies' | 'has_medical_conditions' | 'has_special_needs' | 'track_growth' | 'track_immunizations' | 'track_milestones' | 'allergies'>
      )>> }
    )> }
  ) }
);


export const SignUpCareGiverDocument = `
    mutation SignUpCareGiver($input: CreateCareGiverInput!) {
  SignUpCareGiver(input: $input) {
    id
    uuid
    email
    full_name
    phone_number
    user_type
    care_giver_profile {
      id
      uuid
      country
      state
      city
      address
      role
      children {
        first_name
        birth_term
        date_of_birth
        gender
        genotype
        blood_group
        has_allergies
        has_medical_conditions
        has_special_needs
        track_growth
        track_immunizations
        track_milestones
        allergies
      }
    }
    created_at
    updated_at
  }
}
    `;
export const useSignUpCareGiverMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient, 
      options?: UseMutationOptions<SignUpCareGiverMutation, TError, SignUpCareGiverMutationVariables, TContext>
    ) => 
    useMutation<SignUpCareGiverMutation, TError, SignUpCareGiverMutationVariables, TContext>(
      (variables?: SignUpCareGiverMutationVariables) => fetcher<SignUpCareGiverMutation, SignUpCareGiverMutationVariables>(client, SignUpCareGiverDocument, variables)(),
      options
    );