import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { proxyConfig } from "proxyConfig";
import { map, Observable } from "rxjs";
import { Photo } from "../models/photo";
import { UserQuery } from "../admin/current-user/user-query";

@Injectable({providedIn: 'root'})
export class PhotoService {

    constructor(private http: HttpClient, private userQuery: UserQuery) {}

    public fetchAllPhotos(): Observable<Array<Photo>> {
        return this.http.get<Array<Photo>>(`${proxyConfig.target}/photos/all`)
            .pipe(map((photos) => photos.map((photo: Photo) => new Photo(photo))));
    }

    public sendNewPhoto(payload: any): Observable<string> {
        const userId = this.userQuery.getCurrentUser().id;
        const params = new HttpParams()
            .set('userId', userId);
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.post<string>(`${proxyConfig.target}/admin/new/photo`, payload, {params, headers});
    }
}