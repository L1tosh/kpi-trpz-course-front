import {JwtPayload} from "jwt-decode";

export interface TokenModel {
    token: string;
}

export interface DecodedToken extends JwtPayload {
    sub: string;
    exp: number;
    e: string;
    a: string[];
}
