export interface BlogPostInput {
    title: string;
    content: string;
  }
  
  export interface BlogPostResponse {
    id: string;
    title: string;
    content: string;
    createdAt?: Date; 
  }  