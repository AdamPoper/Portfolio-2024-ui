import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { proxyConfig } from "proxyConfig";
import { map, Observable, tap } from "rxjs";
import { Photo } from "../models/photo";
import { UserQuery } from "../admin/current-user/user-query";
import { PhotoStore } from "../components/pages/photos/photo.store";
import { PhotoQuery } from "../components/pages/photos/photo.query";

interface CountResponse {
    count: number;
}

@Injectable({providedIn: 'root'})
export class PhotoService {

    constructor(private http: HttpClient,
                private userQuery: UserQuery,
                private photoStore: PhotoStore,
                private photoQuery: PhotoQuery
    ) {}

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

    public fetchPhotoTotalCount(): Observable<number> {
        return this.http.get<CountResponse>(`${proxyConfig.target}/photos/count`)
            .pipe(map((res: CountResponse) => res.count));
    }

    public fetchPhotosPaged(pageSize: number, pageNumber: number): Observable<Photo[]> {
        return this.http.get<Photo[]>(`${proxyConfig.target}/photos/paged/${pageSize}/${pageNumber}`)
            .pipe(tap((photos: Photo[]) => {
                console.log(photos);
                const current = this.photoQuery.getAllPhotos().slice();
                current.push(...photos);
                this.photoStore.update({photos: current});
            }));
    }
}