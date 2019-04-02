import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }
    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

/*     login(loginID: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { loginID, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }
                return user;
            }));
    } */
    login(loginID: string, password: string){
        return this.http.post('http://localhost:7777/userLogin',{loginID,password}).pipe(map(user=>{
            var currentUser = JSON.parse(JSON.stringify(user[0]))
            if (currentUser.login) {                
                localStorage.setItem('currentUser', JSON.stringify(currentUser.login));
                this.currentUserSubject.next(currentUser.login);
            }
            return user;
        }))
    }
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}