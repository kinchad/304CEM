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
    login(loginID: string, password: string){
        return this.http.post('http://localhost:7777/userLogin',{loginID,password}).pipe(map(user=>{
            var currentUser = JSON.parse(JSON.stringify(user[0]))
            console.log(currentUser)
            if (currentUser.login) {                
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                this.currentUserSubject.next(currentUser);
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