export interface ILoginParams {
  natid: string;
  password: string;
}

export interface ILoginResult {
  id: string;
  token: string;
  natid: string;
  lastname: string;
  firstname: string;
}

export interface IUser {
  first_name: string;
  last_name: string;
  natid: string;
  password: string;
}

export interface JwtDecodedPayload {
  natid: string;
  id: string;
  first_name: string;
  last_name: string;
}
