import { User } from "./user";

export interface TokenResponse {
    jwt_token: string;
    message: string;
    user: User;
}