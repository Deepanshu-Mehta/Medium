export interface UserSignupInput {
    email: string;
    password: string;
  }
  
  export interface UserSigninInput {
    email: string;
    password: string;
  }
  
  export interface UserResponse {
    id: string;
    email: string;
  } 