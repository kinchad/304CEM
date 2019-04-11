//User management through API Server which is connected to the MySQL database.

import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { User } from '../_models/user'

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    register(user: User) {
        return this.http.post('http://localhost:7777/register',user)
    }
    update(user: User,currentUser: string) {
        return this.http.put('http://localhost:7777/updateUser/'+currentUser, user)
    }
}