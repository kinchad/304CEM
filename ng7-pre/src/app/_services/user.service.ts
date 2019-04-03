import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models/user';
import { environment } from 'src/environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id: number) {
        return this.http.get(`${environment.apiUrl}/users/${id}`);
    }

    register(user: User) {
        return this.http.post('http://localhost:7777/register',user);
    }

    update(user: User,currentUser: string) {
        return this.http.put('http://localhost:7777/updateUser/'+currentUser, user)
    }
    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`);
    }
}