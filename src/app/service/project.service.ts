import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { UserQuery } from "../admin/current-user/user-query";
import { proxyConfig } from "proxyConfig";

interface Response {
    message: string;
}

@Injectable({providedIn: 'root'})
export class ProjectService {
    constructor(private http: HttpClient, private userQuery: UserQuery) {

    }

    public createNewProject(payload: any): Observable<string> {
        const userId = this.userQuery.getCurrentUser().id;
        const params = new HttpParams()
            .set('userId', userId);
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.post<Response>(`${proxyConfig.target}/admin/new/project`, payload, {params, headers})
            .pipe(map((res: Response) => res.message));
    }
}