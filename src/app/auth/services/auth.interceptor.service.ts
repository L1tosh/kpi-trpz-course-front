import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {catchError, throwError} from "rxjs";
import {inject} from "@angular/core";
import {Router} from "@angular/router";
import {TokenService} from "./jwt.token.service";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(TokenService);
    const router = inject(Router);


    const token = authService.getToken();

    if (token) {
        const decodedToken: any = authService.getDecodedToken();
        const currentTime = Math.floor(Date.now() / 1000);


        if (decodedToken.exp < currentTime) {
            authService.logout();
            router.navigate(['/login']);
            return throwError(() => new Error('Token has expired'));
        }

        const cloned = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`)
        });

        return next(cloned).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    authService.logout();
                    router.navigate(['/login']);
                }
                return throwError(() => new Error(error.message));
            })
        );
    }

    // Если токен отсутствует, просто продолжаем запрос без добавления Authorization
    return next(req);
};
