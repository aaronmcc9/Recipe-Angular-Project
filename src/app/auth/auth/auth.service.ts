import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { BehaviorSubject, catchError, Subject, tap, throwError } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    user = new BehaviorSubject<User>(null);
    constructor(private http: HttpClient, private router: Router) { }

    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCqy5ecCF7lWnuuCkG3Le9ZzRBtJWN4hyg',
            {
                email: email,
                password: password,
                returnSecureToken: true
            })
            .pipe(catchError(this.handleError),
                tap(resData => {
                    this.handleAuthentication(
                        resData.email,
                        resData.localId,
                        resData.idToken,
                        +resData.expiresIn
                    );
                }));
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCqy5ecCF7lWnuuCkG3Le9ZzRBtJWN4hyg',
            {
                email: email,
                password: password,
                returnSecureToken: true
            })
            .pipe(catchError(this.handleError),
                tap(resData => {
                    this.handleAuthentication(
                        resData.email,
                        resData.localId,
                        resData.idToken,
                        +resData.expiresIn
                    );
                }));
    }

    logout() {

        this.user.next(null);
        this.router.navigate(['/auth']);
    }

    autoLogin() {
        const userData:{
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string,
        } = JSON.parse(localStorage.getItem('userData'));

        if (!userData) {
            return;
        }

        const storedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate));

        //only notify / set if user is valid
        if(storedUser.token){
            this.user.next(storedUser);
        }

    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occured. Please delete the repo.';
        if (!errorRes.error || !errorRes.error.error)
            return throwError(errorMessage)
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = "This email already exists";
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = "This email was not found";
                break;
            case 'INVALID_PASSWORD':
                errorMessage = "This password is invalid";
                break;
        }

        return throwError(errorMessage);
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000) //coverts to milliseconds

        const user = new User(email,
            userId,
            token,
            expirationDate);

        this.user.next(user);

        //stores logged in user
        localStorage.setItem('userData', JSON.stringify(user));
    }
}