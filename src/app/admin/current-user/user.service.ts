import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { proxyConfig } from "proxyConfig";
import { map, Observable } from "rxjs";

type PreferenceStatusResponse = {
    message: string;
}

@Injectable({providedIn: 'root'})
export class UserService {

    constructor(private http: HttpClient) {}

    public updateFileStoragePreference(userId: number, state: number): Observable<string> {
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        const params = new HttpParams().set('userId', userId);
        return this.http.post<PreferenceStatusResponse>(
            `${proxyConfig.target}/admin/preferences/fileLocation`, 
            {userId: userId, value: state}, 
            {params, headers}
        ).pipe(map((res: PreferenceStatusResponse) => res.message));
    }
}