export const AUTH_SERVICE = "jworks360AuthService";

export interface ICredentials {
  email:string;
  pw: string;
}

export interface IAuthService {
  isAuthorized(user:ICredentials):boolean;
}

export class AuthService implements IAuthService{
  isAuthorized(user:ICredentials):boolean {
    return user.email === 'bum';
  }
}
