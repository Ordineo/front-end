export const AUTH_SERVICE = "jworks360AuthService";

export interface ICredentials {
  email:string;
  pw: string;
}

export interface IAuthService {
  validateCredentials(user:ICredentials):boolean;
}

export class AuthService implements IAuthService{
  validateCredentials(user:ICredentials):boolean {
    return user.email === 'j@d.be';
  }
}
