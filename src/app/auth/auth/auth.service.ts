import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, throwError } from "rxjs";

interface AuthResponseData{
    kind:string;
    idToken:string;
    email:string;
    refreshToken:string;
    expiresIn:string;
    localId:string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) { }

    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCqy5ecCF7lWnuuCkG3Le9ZzRBtJWN4hyg',
            {
                email: email,
                password: password,
                returnSecureToken: true
            })
            .pipe(catchError(errorRes =>{
                let errorMessage = 'An unknown error occured. Please delete the repo.';
                
                if(!errorRes.error || !errorRes.error.error)
                    return throwError(errorMessage)
                switch(errorRes.error.error.message){
                    case 'EMAIL_EXISTS':
                        errorMessage = "This email already exists";
                        break;
                }

                return throwError(errorMessage);
            }));
    }
}