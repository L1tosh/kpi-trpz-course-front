import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {TokenService} from "./jwt.token.service";
import {LoginModel} from "../models/login.model";
import {TokenModel} from "../models/token.model";

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private apiUrl = 'http://localhost:8443/api/v1/auth/login';

    constructor(private http: HttpClient, private tokenService: TokenService) {
    }

    login(credentials: LoginModel): Observable<any> {
        return this.http.post<TokenModel>(this.apiUrl, credentials).pipe(
            tap((response: TokenModel) => {
                if (response.token) {
                    this.tokenService.saveToken(response.token);
                }
            })
        );
    }

    logout(): void {
        this.tokenService.removeToken();
    }

    isAuthenticated(): boolean {
        return this.tokenService.isLoggedIn();
    }
}
