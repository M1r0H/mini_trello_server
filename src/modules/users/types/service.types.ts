export interface UserCreateParams {
  email: string;
}

export interface UserEditParams {
  id: string;
  body: Partial<UserCreateParams>;
}
