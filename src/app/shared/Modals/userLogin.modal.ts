export interface loginResponse {
  email: string;
  emailVerified: boolean;
  displayName: string;
  isAnonymous: boolean;
  phoneNumber: number;
  photoURL: string;
  refreshToken: string;
  uid: string;
  providerId: string;
}
