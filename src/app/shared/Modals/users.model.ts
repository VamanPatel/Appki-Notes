export interface UserResponse {
    uid: string;
    result: Result;
}

interface Result {
    displayName?: any;
    email: string;
    photoURL?: any;
    emailVerified: boolean;
    uid: string;
}
