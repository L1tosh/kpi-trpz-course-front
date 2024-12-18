import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../auth/services/auth.service';
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {LoginModel} from "../../auth/models/login.model";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    imports: [
        ReactiveFormsModule,
        NgIf
    ],
    standalone: true
})
export class LoginComponent {
    loginForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.loginForm = this.fb.group({
            username: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        });
    }

    onSubmit() {
        if (this.loginForm.valid) {
            const loginData: LoginModel = {
                username: this.loginForm.value.username,
                password: this.loginForm.value.password
            };

            this.authService.login(loginData).subscribe(
                response => {
                    this.router.navigate(['']);
                },
                error => {
                    alert('Login failed: ' + error.message);
                }
            );
        }
    }
}
