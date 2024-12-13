export interface UserSignupRequest {
    email: string;
    password: string;
  }
  
  export interface UserSigninRequest {
    email: string;
    password: string;
  }
  
  export interface PostCreateRequest {
    title: string;
    content: string;
  }
  
  export interface PostUpdateRequest extends PostCreateRequest {
    id: string;
  }
  
  export interface JwtPayload {
    id: string;
  } 