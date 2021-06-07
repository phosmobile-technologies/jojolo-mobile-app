import { GraphQLClient } from 'graphql-request';
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from 'react-query';
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
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

/** Response returned after saving a post */
export type ApiResponse = {
  __typename?: 'ApiResponse';
  /** A message indicating the success / error that occurs when saving a post */
  message: Scalars['String'];
  /** Indicates if the operation was successful or not */
  success: Scalars['Boolean'];
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
  /** An array of images added to the post */
  images?: Maybe<Array<Maybe<Scalars['Upload']>>>;
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

/** Input for getting a post's comments */
export type GetPostCommentsInput = {
  /** The id of the post whose comments are needed */
  post_id: Scalars['Int'];
};

/** Input for getting the forum news feed of posts */
export type GetPostsFeedInput = {
  /** The type of sorting to be done on the posts, either by popularity or by latest posts */
  sortType?: Maybe<PostsSortType>;
};

/** Input for getting all posts that belong to a tag */
export type GetPostsForTagInput = {
  /** The id of the tag whose posts we need */
  tag_id: Scalars['Int'];
};

/** Input for getting a users posts */
export type GetUserPostsInput = {
  /** The id of the user whose posts we are retrieving */
  user_id: Scalars['Int'];
};

/** Input for getting a users saved posts */
export type GetUserSavedPostsInput = {
  /** The id of the user whose saved posts we are retrieving */
  user_id: Scalars['Int'];
};

export type HealthCareProfessionalProfile = {
  __typename?: 'HealthCareProfessionalProfile';
  /** The date and time when the health professional's profile was created */
  created_at: Scalars['DateTime'];
  /** The health professional's profile id */
  id: Scalars['Int'];
  /** The healthcare professional's role */
  role: HealthCareProfessionalRole;
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

/** Input for liking a post */
export type LikePostInput = {
  /** The id of the post the user wants to like */
  post_id: Scalars['Int'];
  /** The id of the user who wants to like the post */
  user_id: Scalars['Int'];
};

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
  /** The authenticated user */
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Create a post */
  CreatePost: Post;
  /** Create a post comment */
  CreatePostComment: PostComment;
  /** Create a post comment reply */
  CreatePostCommentReply: PostCommentReply;
  /** Create a post tag */
  CreatePostTag: PostTag;
  /** Like a post */
  LikePost: ApiResponse;
  /** Login a user */
  Login: LoginResponse;
  /** Report a post */
  ReportPost: ApiResponse;
  /** Save a post */
  SavePost: ApiResponse;
  /** Create a user account for a caregiver */
  SignUpCareGiver: User;
  /** Create a user account for a health care professional */
  SignUpHealthCareProfessional: User;
  /** Update a post */
  UpdatePost: Post;
  testFileUpload: ApiResponse;
};


export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


export type MutationCreatePostCommentArgs = {
  input: PostCommentInput;
};


export type MutationCreatePostCommentReplyArgs = {
  input: PostCommentReplyInput;
};


export type MutationCreatePostTagArgs = {
  input: PostTagInput;
};


export type MutationLikePostArgs = {
  input: LikePostInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationReportPostArgs = {
  input: ReportPostInput;
};


export type MutationSavePostArgs = {
  input: SavePostInput;
};


export type MutationSignUpCareGiverArgs = {
  input: CreateCareGiverInput;
};


export type MutationSignUpHealthCareProfessionalArgs = {
  input: CreateHealthCareProfessionalInput;
};


export type MutationUpdatePostArgs = {
  id: Scalars['Int'];
  input: CreatePostInput;
};


export type MutationTestFileUploadArgs = {
  files: Array<Scalars['Upload']>;
};

/** Model for a post */
export type Post = {
  __typename?: 'Post';
  /** The post's comments */
  comments: Array<Maybe<PostComment>>;
  /** The post content */
  content: Scalars['String'];
  /** The date and time when the post was created */
  created_at: Scalars['DateTime'];
  /** The files uploaded to the post */
  files: Array<Maybe<PostFileUpload>>;
  /** The post id */
  id: Scalars['Int'];
  /** The number of likes the post has */
  likes: Scalars['Int'];
  /** Indicates if the post was posted anonymously or not */
  posted_anonymously: Scalars['Boolean'];
  /** The post's tags */
  tags: Array<Maybe<PostTag>>;
  /** The post title */
  title: Scalars['String'];
  /** The date and time when the post was last updated */
  updated_at: Scalars['DateTime'];
  /** The user who created the post */
  user: User;
  /** The post id */
  uuid: Scalars['String'];
};

/** Model for a comment made on a post */
export type PostComment = {
  __typename?: 'PostComment';
  /** The comments content */
  content: Scalars['String'];
  /** The date and time when the comment was created */
  created_at: Scalars['DateTime'];
  /** The comment id */
  id: Scalars['Int'];
  /** The post that was commented on */
  post?: Maybe<Post>;
  /** The replies to the post comment */
  replies: Array<Maybe<PostCommentReply>>;
  /** The user who made the comment */
  user: User;
};

/** Input for working with post comments */
export type PostCommentInput = {
  /** The comment made */
  content: Scalars['String'];
  /** The id of the post that was commented on */
  post_id: Scalars['Int'];
  /** The id of the user that made the comment */
  user_id: Scalars['Int'];
};

/** Model for a reply made on a comment */
export type PostCommentReply = {
  __typename?: 'PostCommentReply';
  /** The post comment that was replied */
  comment: Post;
  /** The comment reply content */
  content: Scalars['String'];
  /** The date and time when the comment replay was posted */
  created_at: Scalars['DateTime'];
  /** The comment reply id */
  id: Scalars['Int'];
  /** The user who made the comment reply */
  user: User;
};

/** Input for for working with post comment replies */
export type PostCommentReplyInput = {
  /** The id of the post comment that was replied */
  comment_id: Scalars['Int'];
  /** The comment reply made */
  content: Scalars['String'];
  /** The id of the user that made the comment reply */
  user_id: Scalars['Int'];
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

/** Model for a post tag with the count of posts attached */
export type PostTagWithCount = {
  __typename?: 'PostTagWithCount';
  /** The tag id */
  id: Scalars['Int'];
  /** The tags name */
  name: Scalars['String'];
  /** The number of posts that have been tagged with this tag */
  number_of_posts: Scalars['Int'];
};

/** Enum for sorting post records */
export enum PostsSortType {
  Latest = 'LATEST',
  MostPopular = 'MOST_POPULAR',
  Oldest = 'OLDEST'
}

export type Query = {
  __typename?: 'Query';
  /** Find a user by their unique values like id, uuid or email */
  FindUser: User;
  /** Get the comments on a post */
  GetPostComments: Array<PostComment>;
  /** Get the posts feed */
  GetPostsFeed: Array<Maybe<Post>>;
  /** Get the posts for a tag */
  GetPostsForTag: Array<Maybe<Post>>;
  /** Get all forum posts tags */
  GetTags: Array<Maybe<PostTagWithCount>>;
  /** Get the posts created by a user */
  GetUserPosts: Array<Maybe<Post>>;
  /** Get the posts saved by a user */
  GetUserSavedPosts: Array<Maybe<Post>>;
  /** Search for posts by title or content */
  SearchPosts: Array<Maybe<Post>>;
};


export type QueryFindUserArgs = {
  input: FindUserInput;
};


export type QueryGetPostCommentsArgs = {
  input: GetPostCommentsInput;
};


export type QueryGetPostsFeedArgs = {
  input?: Maybe<GetPostsFeedInput>;
};


export type QueryGetPostsForTagArgs = {
  input: GetPostsForTagInput;
};


export type QueryGetUserPostsArgs = {
  input: GetUserPostsInput;
};


export type QueryGetUserSavedPostsArgs = {
  input: GetUserSavedPostsInput;
};


export type QuerySearchPostsArgs = {
  input: SearchPostsInput;
};

/** Input for reporting a post */
export type ReportPostInput = {
  /** The id of the post the user wants to report */
  post_id: Scalars['Int'];
  /** The reason the user is reporting the post */
  reason: Scalars['String'];
  /** The id of the user who wants to report the post */
  user_id: Scalars['Int'];
};

/** Input for saving a post */
export type SavePostInput = {
  /** The id of the post the user wants to save */
  post_id: Scalars['Int'];
  /** The id of the user who wants to save the post */
  user_id: Scalars['Int'];
};

/** Input for searching for posts */
export type SearchPostsInput = {
  /** The search query to search posts by */
  search_query: Scalars['String'];
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
  /** The user's profile image url */
  profile_image: Scalars['String'];
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

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', Login: { __typename?: 'LoginResponse', access_token: string, user: { __typename?: 'User', id: number, uuid: string, full_name: string, email: string, phone_number: string, user_type: UserType, profile_image: string, care_giver_profile?: Maybe<{ __typename?: 'CareGiverProfile', id: number, uuid: string, address: string, city: string, country: string, state: string, role: CareGiverRole }>, health_care_professional_profile?: Maybe<{ __typename?: 'HealthCareProfessionalProfile', id: number, years_of_experience: number }> } } };

export type SignUpCareGiverMutationVariables = Exact<{
  input: CreateCareGiverInput;
}>;


export type SignUpCareGiverMutation = { __typename?: 'Mutation', SignUpCareGiver: { __typename?: 'User', id: number, uuid: string, email: string, full_name: string, phone_number: string, user_type: UserType, created_at: any, updated_at: any, care_giver_profile?: Maybe<{ __typename?: 'CareGiverProfile', id: number, uuid: string, country: string, state: string, city: string, address: string, role: CareGiverRole, children: Array<Maybe<{ __typename?: 'Child', first_name: string, birth_term: BirthTerm, date_of_birth: any, gender: Gender, genotype: Genotype, blood_group: BloodGroup, has_allergies: boolean, has_medical_conditions: boolean, has_special_needs: boolean, track_growth: boolean, track_immunizations: boolean, track_milestones: boolean, allergies: Array<string> }>> }> } };

export type SignUpHealthCareProfessionalMutationVariables = Exact<{
  input: CreateHealthCareProfessionalInput;
}>;


export type SignUpHealthCareProfessionalMutation = { __typename?: 'Mutation', SignUpHealthCareProfessional: { __typename?: 'User', id: number, uuid: string, email: string, full_name: string, phone_number: string, user_type: UserType, created_at: any, updated_at: any, health_care_professional_profile?: Maybe<{ __typename?: 'HealthCareProfessionalProfile', id: number, years_of_experience: number, verification_files: Array<{ __typename?: 'HealthCareProfessionalVerificationFile', id: number, file_url: string, type: HealthCareProfessionalVerificationFileType }> }> } };

export type PostFragmentFragment = { __typename?: 'Post', id: number, uuid: string, title: string, likes: number, content: string, created_at: any, comments: Array<Maybe<{ __typename?: 'PostComment', id: number }>>, tags: Array<Maybe<{ __typename?: 'PostTag', id: number, name: string }>>, user: { __typename?: 'User', id: number, full_name: string, phone_number: string, email: string, user_type: UserType, profile_image: string, care_giver_profile?: Maybe<{ __typename?: 'CareGiverProfile', id: number, role: CareGiverRole }>, health_care_professional_profile?: Maybe<{ __typename?: 'HealthCareProfessionalProfile', id: number, role: HealthCareProfessionalRole, years_of_experience: number }> } };

export type CreatePostCommentReplyMutationVariables = Exact<{
  input: PostCommentReplyInput;
}>;


export type CreatePostCommentReplyMutation = { __typename?: 'Mutation', CreatePostCommentReply: { __typename?: 'PostCommentReply', id: number, content: string, user: { __typename?: 'User', id: number }, comment: { __typename?: 'Post', id: number } } };

export type CreatePostCommentMutationVariables = Exact<{
  input: PostCommentInput;
}>;


export type CreatePostCommentMutation = { __typename?: 'Mutation', CreatePostComment: { __typename?: 'PostComment', id: number, content: string, user: { __typename?: 'User', id: number }, post?: Maybe<{ __typename?: 'Post', id: number }> } };

export type CreatePostMutationVariables = Exact<{
  input: CreatePostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', CreatePost: { __typename?: 'Post', id: number, uuid: string, posted_anonymously: boolean, title: string, content: string, tags: Array<Maybe<{ __typename?: 'PostTag', id: number, name: string }>>, files: Array<Maybe<{ __typename?: 'PostFileUpload', id: number, file_url: string }>>, user: { __typename?: 'User', id: number } } };

export type LikePostMutationVariables = Exact<{
  input: LikePostInput;
}>;


export type LikePostMutation = { __typename?: 'Mutation', LikePost: { __typename?: 'ApiResponse', success: boolean, message: string } };

export type ReportPostMutationVariables = Exact<{
  input: ReportPostInput;
}>;


export type ReportPostMutation = { __typename?: 'Mutation', ReportPost: { __typename?: 'ApiResponse', success: boolean, message: string } };

export type SavePostMutationVariables = Exact<{
  input: SavePostInput;
}>;


export type SavePostMutation = { __typename?: 'Mutation', SavePost: { __typename?: 'ApiResponse', success: boolean, message: string } };

export type UpdatePostMutationVariables = Exact<{
  id: Scalars['Int'];
  input: CreatePostInput;
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', UpdatePost: { __typename?: 'Post', id: number, uuid: string, posted_anonymously: boolean, title: string, content: string, tags: Array<Maybe<{ __typename?: 'PostTag', id: number, name: string }>>, files: Array<Maybe<{ __typename?: 'PostFileUpload', id: number, file_url: string }>>, user: { __typename?: 'User', id: number } } };

export type GetPostCommentsQueryVariables = Exact<{
  input: GetPostCommentsInput;
}>;


export type GetPostCommentsQuery = { __typename?: 'Query', GetPostComments: Array<{ __typename?: 'PostComment', id: number, content: string, created_at: any, replies: Array<Maybe<{ __typename?: 'PostCommentReply', id: number, content: string, created_at: any, user: { __typename?: 'User', id: number, full_name: string, user_type: UserType, profile_image: string, care_giver_profile?: Maybe<{ __typename?: 'CareGiverProfile', role: CareGiverRole }>, health_care_professional_profile?: Maybe<{ __typename?: 'HealthCareProfessionalProfile', role: HealthCareProfessionalRole }> } }>>, user: { __typename?: 'User', id: number, full_name: string, user_type: UserType, profile_image: string, care_giver_profile?: Maybe<{ __typename?: 'CareGiverProfile', role: CareGiverRole }>, health_care_professional_profile?: Maybe<{ __typename?: 'HealthCareProfessionalProfile', role: HealthCareProfessionalRole }> }, post?: Maybe<{ __typename?: 'Post', id: number }> }> };

export type GetTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTagsQuery = { __typename?: 'Query', GetTags: Array<Maybe<{ __typename?: 'PostTagWithCount', id: number, name: string, number_of_posts: number }>> };

export type GetPostsForTagQueryVariables = Exact<{
  input: GetPostsForTagInput;
}>;


export type GetPostsForTagQuery = { __typename?: 'Query', GetPostsForTag: Array<Maybe<(
    { __typename?: 'Post' }
    & PostFragmentFragment
  )>> };

export type GetPostsFeedQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPostsFeedQuery = { __typename?: 'Query', GetPostsFeed: Array<Maybe<{ __typename?: 'Post', id: number, uuid: string, title: string, likes: number, content: string, created_at: any, comments: Array<Maybe<{ __typename?: 'PostComment', id: number }>>, tags: Array<Maybe<{ __typename?: 'PostTag', id: number, name: string }>>, user: { __typename?: 'User', id: number, full_name: string, phone_number: string, email: string, user_type: UserType, profile_image: string, care_giver_profile?: Maybe<{ __typename?: 'CareGiverProfile', id: number, role: CareGiverRole }>, health_care_professional_profile?: Maybe<{ __typename?: 'HealthCareProfessionalProfile', id: number, role: HealthCareProfessionalRole, years_of_experience: number }> } }>> };

export type GetUserPostsQueryVariables = Exact<{
  input: GetUserPostsInput;
}>;


export type GetUserPostsQuery = { __typename?: 'Query', GetUserPosts: Array<Maybe<{ __typename?: 'Post', id: number, uuid: string, title: string, likes: number, content: string, created_at: any, comments: Array<Maybe<{ __typename?: 'PostComment', id: number }>>, tags: Array<Maybe<{ __typename?: 'PostTag', id: number, name: string }>>, user: { __typename?: 'User', id: number, full_name: string, phone_number: string, email: string, user_type: UserType, profile_image: string, care_giver_profile?: Maybe<{ __typename?: 'CareGiverProfile', id: number, role: CareGiverRole }>, health_care_professional_profile?: Maybe<{ __typename?: 'HealthCareProfessionalProfile', id: number, role: HealthCareProfessionalRole, years_of_experience: number }> } }>> };

export type GetUserSavedPostsQueryVariables = Exact<{
  input: GetUserSavedPostsInput;
}>;


export type GetUserSavedPostsQuery = { __typename?: 'Query', GetUserSavedPosts: Array<Maybe<{ __typename?: 'Post', id: number, uuid: string, title: string, likes: number, content: string, created_at: any, comments: Array<Maybe<{ __typename?: 'PostComment', id: number }>>, tags: Array<Maybe<{ __typename?: 'PostTag', id: number, name: string }>>, user: { __typename?: 'User', id: number, full_name: string, phone_number: string, email: string, user_type: UserType, profile_image: string, care_giver_profile?: Maybe<{ __typename?: 'CareGiverProfile', id: number, role: CareGiverRole }>, health_care_professional_profile?: Maybe<{ __typename?: 'HealthCareProfessionalProfile', id: number, role: HealthCareProfessionalRole, years_of_experience: number }> } }>> };

export type SearchPostsQueryVariables = Exact<{
  input: SearchPostsInput;
}>;


export type SearchPostsQuery = { __typename?: 'Query', SearchPosts: Array<Maybe<{ __typename?: 'Post', id: number, uuid: string, title: string, likes: number, content: string, created_at: any, comments: Array<Maybe<{ __typename?: 'PostComment', id: number }>>, tags: Array<Maybe<{ __typename?: 'PostTag', id: number, name: string }>>, user: { __typename?: 'User', id: number, full_name: string, phone_number: string, email: string, user_type: UserType, profile_image: string, care_giver_profile?: Maybe<{ __typename?: 'CareGiverProfile', id: number, role: CareGiverRole }>, health_care_professional_profile?: Maybe<{ __typename?: 'HealthCareProfessionalProfile', id: number, role: HealthCareProfessionalRole, years_of_experience: number }> } }>> };

export const PostFragmentFragmentDoc = `
    fragment postFragment on Post {
  id
  uuid
  title
  likes
  content
  comments {
    id
  }
  tags {
    id
    name
  }
  user {
    id
    full_name
    phone_number
    email
    user_type
    profile_image
    care_giver_profile {
      id
      role
    }
    health_care_professional_profile {
      id
      role
      years_of_experience
    }
  }
  created_at
}
    `;
export const LoginDocument = `
    mutation Login($input: LoginInput!) {
  Login(input: $input) {
    access_token
    user {
      id
      uuid
      full_name
      email
      phone_number
      user_type
      profile_image
      care_giver_profile {
        id
        uuid
        address
        city
        country
        state
        role
      }
      health_care_professional_profile {
        id
        years_of_experience
      }
    }
  }
}
    `;
export const useLoginMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient, 
      options?: UseMutationOptions<LoginMutation, TError, LoginMutationVariables, TContext>
    ) => 
    useMutation<LoginMutation, TError, LoginMutationVariables, TContext>(
      (variables?: LoginMutationVariables) => fetcher<LoginMutation, LoginMutationVariables>(client, LoginDocument, variables)(),
      options
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
export const SignUpHealthCareProfessionalDocument = `
    mutation SignUpHealthCareProfessional($input: CreateHealthCareProfessionalInput!) {
  SignUpHealthCareProfessional(input: $input) {
    id
    uuid
    email
    full_name
    phone_number
    user_type
    health_care_professional_profile {
      id
      years_of_experience
      verification_files {
        id
        file_url
        type
      }
    }
    created_at
    updated_at
  }
}
    `;
export const useSignUpHealthCareProfessionalMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient, 
      options?: UseMutationOptions<SignUpHealthCareProfessionalMutation, TError, SignUpHealthCareProfessionalMutationVariables, TContext>
    ) => 
    useMutation<SignUpHealthCareProfessionalMutation, TError, SignUpHealthCareProfessionalMutationVariables, TContext>(
      (variables?: SignUpHealthCareProfessionalMutationVariables) => fetcher<SignUpHealthCareProfessionalMutation, SignUpHealthCareProfessionalMutationVariables>(client, SignUpHealthCareProfessionalDocument, variables)(),
      options
    );
export const CreatePostCommentReplyDocument = `
    mutation CreatePostCommentReply($input: PostCommentReplyInput!) {
  CreatePostCommentReply(input: $input) {
    id
    content
    user {
      id
    }
    comment {
      id
    }
  }
}
    `;
export const useCreatePostCommentReplyMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient, 
      options?: UseMutationOptions<CreatePostCommentReplyMutation, TError, CreatePostCommentReplyMutationVariables, TContext>
    ) => 
    useMutation<CreatePostCommentReplyMutation, TError, CreatePostCommentReplyMutationVariables, TContext>(
      (variables?: CreatePostCommentReplyMutationVariables) => fetcher<CreatePostCommentReplyMutation, CreatePostCommentReplyMutationVariables>(client, CreatePostCommentReplyDocument, variables)(),
      options
    );
export const CreatePostCommentDocument = `
    mutation CreatePostComment($input: PostCommentInput!) {
  CreatePostComment(input: $input) {
    id
    content
    user {
      id
    }
    post {
      id
    }
  }
}
    `;
export const useCreatePostCommentMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient, 
      options?: UseMutationOptions<CreatePostCommentMutation, TError, CreatePostCommentMutationVariables, TContext>
    ) => 
    useMutation<CreatePostCommentMutation, TError, CreatePostCommentMutationVariables, TContext>(
      (variables?: CreatePostCommentMutationVariables) => fetcher<CreatePostCommentMutation, CreatePostCommentMutationVariables>(client, CreatePostCommentDocument, variables)(),
      options
    );
export const CreatePostDocument = `
    mutation CreatePost($input: CreatePostInput!) {
  CreatePost(input: $input) {
    id
    uuid
    posted_anonymously
    title
    content
    tags {
      id
      name
    }
    files {
      id
      file_url
    }
    user {
      id
    }
  }
}
    `;
export const useCreatePostMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient, 
      options?: UseMutationOptions<CreatePostMutation, TError, CreatePostMutationVariables, TContext>
    ) => 
    useMutation<CreatePostMutation, TError, CreatePostMutationVariables, TContext>(
      (variables?: CreatePostMutationVariables) => fetcher<CreatePostMutation, CreatePostMutationVariables>(client, CreatePostDocument, variables)(),
      options
    );
export const LikePostDocument = `
    mutation LikePost($input: LikePostInput!) {
  LikePost(input: $input) {
    success
    message
  }
}
    `;
export const useLikePostMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient, 
      options?: UseMutationOptions<LikePostMutation, TError, LikePostMutationVariables, TContext>
    ) => 
    useMutation<LikePostMutation, TError, LikePostMutationVariables, TContext>(
      (variables?: LikePostMutationVariables) => fetcher<LikePostMutation, LikePostMutationVariables>(client, LikePostDocument, variables)(),
      options
    );
export const ReportPostDocument = `
    mutation ReportPost($input: ReportPostInput!) {
  ReportPost(input: $input) {
    success
    message
  }
}
    `;
export const useReportPostMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient, 
      options?: UseMutationOptions<ReportPostMutation, TError, ReportPostMutationVariables, TContext>
    ) => 
    useMutation<ReportPostMutation, TError, ReportPostMutationVariables, TContext>(
      (variables?: ReportPostMutationVariables) => fetcher<ReportPostMutation, ReportPostMutationVariables>(client, ReportPostDocument, variables)(),
      options
    );
export const SavePostDocument = `
    mutation SavePost($input: SavePostInput!) {
  SavePost(input: $input) {
    success
    message
  }
}
    `;
export const useSavePostMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient, 
      options?: UseMutationOptions<SavePostMutation, TError, SavePostMutationVariables, TContext>
    ) => 
    useMutation<SavePostMutation, TError, SavePostMutationVariables, TContext>(
      (variables?: SavePostMutationVariables) => fetcher<SavePostMutation, SavePostMutationVariables>(client, SavePostDocument, variables)(),
      options
    );
export const UpdatePostDocument = `
    mutation UpdatePost($id: Int!, $input: CreatePostInput!) {
  UpdatePost(id: $id, input: $input) {
    id
    uuid
    posted_anonymously
    title
    content
    tags {
      id
      name
    }
    files {
      id
      file_url
    }
    user {
      id
    }
  }
}
    `;
export const useUpdatePostMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient, 
      options?: UseMutationOptions<UpdatePostMutation, TError, UpdatePostMutationVariables, TContext>
    ) => 
    useMutation<UpdatePostMutation, TError, UpdatePostMutationVariables, TContext>(
      (variables?: UpdatePostMutationVariables) => fetcher<UpdatePostMutation, UpdatePostMutationVariables>(client, UpdatePostDocument, variables)(),
      options
    );
export const GetPostCommentsDocument = `
    query GetPostComments($input: GetPostCommentsInput!) {
  GetPostComments(input: $input) {
    id
    content
    created_at
    replies {
      id
      content
      created_at
      user {
        id
        full_name
        user_type
        profile_image
        care_giver_profile {
          role
        }
        health_care_professional_profile {
          role
        }
      }
    }
    user {
      id
      full_name
      user_type
      profile_image
      care_giver_profile {
        role
      }
      health_care_professional_profile {
        role
      }
    }
    post {
      id
    }
  }
}
    `;
export const useGetPostCommentsQuery = <
      TData = GetPostCommentsQuery,
      TError = unknown
    >(
      client: GraphQLClient, 
      variables: GetPostCommentsQueryVariables, 
      options?: UseQueryOptions<GetPostCommentsQuery, TError, TData>
    ) => 
    useQuery<GetPostCommentsQuery, TError, TData>(
      ['GetPostComments', variables],
      fetcher<GetPostCommentsQuery, GetPostCommentsQueryVariables>(client, GetPostCommentsDocument, variables),
      options
    );
useGetPostCommentsQuery.getKey = (variables: GetPostCommentsQueryVariables) => ['GetPostComments', variables];

export const GetTagsDocument = `
    query GetTags {
  GetTags {
    id
    name
    number_of_posts
  }
}
    `;
export const useGetTagsQuery = <
      TData = GetTagsQuery,
      TError = unknown
    >(
      client: GraphQLClient, 
      variables?: GetTagsQueryVariables, 
      options?: UseQueryOptions<GetTagsQuery, TError, TData>
    ) => 
    useQuery<GetTagsQuery, TError, TData>(
      ['GetTags', variables],
      fetcher<GetTagsQuery, GetTagsQueryVariables>(client, GetTagsDocument, variables),
      options
    );
useGetTagsQuery.getKey = (variables?: GetTagsQueryVariables) => ['GetTags', variables];

export const GetPostsForTagDocument = `
    query GetPostsForTag($input: GetPostsForTagInput!) {
  GetPostsForTag(input: $input) {
    ...postFragment
  }
}
    ${PostFragmentFragmentDoc}`;
export const useGetPostsForTagQuery = <
      TData = GetPostsForTagQuery,
      TError = unknown
    >(
      client: GraphQLClient, 
      variables: GetPostsForTagQueryVariables, 
      options?: UseQueryOptions<GetPostsForTagQuery, TError, TData>
    ) => 
    useQuery<GetPostsForTagQuery, TError, TData>(
      ['GetPostsForTag', variables],
      fetcher<GetPostsForTagQuery, GetPostsForTagQueryVariables>(client, GetPostsForTagDocument, variables),
      options
    );
useGetPostsForTagQuery.getKey = (variables: GetPostsForTagQueryVariables) => ['GetPostsForTag', variables];

export const GetPostsFeedDocument = `
    query GetPostsFeed {
  GetPostsFeed {
    id
    uuid
    title
    likes
    content
    comments {
      id
    }
    tags {
      id
      name
    }
    user {
      id
      full_name
      phone_number
      email
      user_type
      profile_image
      care_giver_profile {
        id
        role
      }
      health_care_professional_profile {
        id
        role
        years_of_experience
      }
    }
    created_at
  }
}
    `;
export const useGetPostsFeedQuery = <
      TData = GetPostsFeedQuery,
      TError = unknown
    >(
      client: GraphQLClient, 
      variables?: GetPostsFeedQueryVariables, 
      options?: UseQueryOptions<GetPostsFeedQuery, TError, TData>
    ) => 
    useQuery<GetPostsFeedQuery, TError, TData>(
      ['GetPostsFeed', variables],
      fetcher<GetPostsFeedQuery, GetPostsFeedQueryVariables>(client, GetPostsFeedDocument, variables),
      options
    );
useGetPostsFeedQuery.getKey = (variables?: GetPostsFeedQueryVariables) => ['GetPostsFeed', variables];

export const GetUserPostsDocument = `
    query GetUserPosts($input: GetUserPostsInput!) {
  GetUserPosts(input: $input) {
    id
    uuid
    title
    likes
    content
    comments {
      id
    }
    tags {
      id
      name
    }
    user {
      id
      full_name
      phone_number
      email
      user_type
      profile_image
      care_giver_profile {
        id
        role
      }
      health_care_professional_profile {
        id
        role
        years_of_experience
      }
    }
    created_at
  }
}
    `;
export const useGetUserPostsQuery = <
      TData = GetUserPostsQuery,
      TError = unknown
    >(
      client: GraphQLClient, 
      variables: GetUserPostsQueryVariables, 
      options?: UseQueryOptions<GetUserPostsQuery, TError, TData>
    ) => 
    useQuery<GetUserPostsQuery, TError, TData>(
      ['GetUserPosts', variables],
      fetcher<GetUserPostsQuery, GetUserPostsQueryVariables>(client, GetUserPostsDocument, variables),
      options
    );
useGetUserPostsQuery.getKey = (variables: GetUserPostsQueryVariables) => ['GetUserPosts', variables];

export const GetUserSavedPostsDocument = `
    query GetUserSavedPosts($input: GetUserSavedPostsInput!) {
  GetUserSavedPosts(input: $input) {
    id
    uuid
    title
    likes
    content
    comments {
      id
    }
    tags {
      id
      name
    }
    user {
      id
      full_name
      phone_number
      email
      user_type
      profile_image
      care_giver_profile {
        id
        role
      }
      health_care_professional_profile {
        id
        role
        years_of_experience
      }
    }
    created_at
  }
}
    `;
export const useGetUserSavedPostsQuery = <
      TData = GetUserSavedPostsQuery,
      TError = unknown
    >(
      client: GraphQLClient, 
      variables: GetUserSavedPostsQueryVariables, 
      options?: UseQueryOptions<GetUserSavedPostsQuery, TError, TData>
    ) => 
    useQuery<GetUserSavedPostsQuery, TError, TData>(
      ['GetUserSavedPosts', variables],
      fetcher<GetUserSavedPostsQuery, GetUserSavedPostsQueryVariables>(client, GetUserSavedPostsDocument, variables),
      options
    );
useGetUserSavedPostsQuery.getKey = (variables: GetUserSavedPostsQueryVariables) => ['GetUserSavedPosts', variables];

export const SearchPostsDocument = `
    query SearchPosts($input: SearchPostsInput!) {
  SearchPosts(input: $input) {
    id
    uuid
    title
    likes
    content
    comments {
      id
    }
    tags {
      id
      name
    }
    user {
      id
      full_name
      phone_number
      email
      user_type
      profile_image
      care_giver_profile {
        id
        role
      }
      health_care_professional_profile {
        id
        role
        years_of_experience
      }
    }
    created_at
  }
}
    `;
export const useSearchPostsQuery = <
      TData = SearchPostsQuery,
      TError = unknown
    >(
      client: GraphQLClient, 
      variables: SearchPostsQueryVariables, 
      options?: UseQueryOptions<SearchPostsQuery, TError, TData>
    ) => 
    useQuery<SearchPostsQuery, TError, TData>(
      ['SearchPosts', variables],
      fetcher<SearchPostsQuery, SearchPostsQueryVariables>(client, SearchPostsDocument, variables),
      options
    );
useSearchPostsQuery.getKey = (variables: SearchPostsQueryVariables) => ['SearchPosts', variables];
