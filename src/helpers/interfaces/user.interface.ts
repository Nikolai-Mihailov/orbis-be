export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
}

export interface CurrentUser {
  id: number;
  name: string;
  email: string;
}
