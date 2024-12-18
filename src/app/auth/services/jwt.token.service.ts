import {Injectable} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import { jwtDecode } from "jwt-decode";
import {DecodedToken} from "../models/token.model";


@Injectable({
    providedIn: 'root'
})
export class TokenService {
    private readonly TOKEN_KEY = 'authToken';

    constructor(private cookieService: CookieService, private router: Router) {
    }

    public saveToken(token: string): void {
        localStorage.setItem(this.TOKEN_KEY, token);
    }

    public getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    public removeToken(): void {
        localStorage.removeItem(this.TOKEN_KEY);
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem(this.TOKEN_KEY);
    }

    logout(): void {
        this.cookieService.delete(this.TOKEN_KEY, '/');
        this.removeToken();
        this.router.navigate(['/login']);
    }

    getDecodedToken(): DecodedToken | null {
        if (this.isLoggedIn()) {
            try {
                const token = this.getToken();
                if (token) {
                    return jwtDecode<DecodedToken>(token);
                } else {
                    console.error('Token is missing');
                    return null;
                }
            } catch (error) {
                console.error('Failed to decode token', error);
                return null;
            }
        } else {
            this.router.navigate(['/login']);
            return null;
        }
    }

}
