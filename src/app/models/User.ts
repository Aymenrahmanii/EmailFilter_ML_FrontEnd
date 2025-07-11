export interface User {
  name: string;
  email: string;
  password: string;
  role?: string; // optional if backend assigns default
}
