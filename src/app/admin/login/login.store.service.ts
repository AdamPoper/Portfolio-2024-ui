import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { proxyConfig } from "proxyConfig";
import { Observable, tap } from "rxjs";
import { User } from "src/app/models/user";
import { UserStore } from "../current-user/user.store";

@Injectable({providedIn: 'root'})
export class LoginStoreService {

    constructor(private http: HttpClient, private userStore: UserStore) {
        
    }

    public login(username: string, password: string): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.post<User>(`${proxyConfig.target}/authenticate`, {username, password}, {headers})
            .pipe(tap((user: User) => {
                this.userStore.update({currentUser: user});
            }));
    }
}