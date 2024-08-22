import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map, tap } from "rxjs";
import { UserQuery } from "../admin/current-user/user-query";
import { proxyConfig } from "proxyConfig";
import { Project } from "../models/project";
import { MessageResponse } from "../models/message-response";
import { ProjectStore } from "../components/pages/projects/project.store";
import { ProjectMedia } from "../models/project-media";
import { ProjectQuery } from "../components/pages/projects/project.query";

@Injectable({providedIn: 'root'})
export class ProjectService {
    constructor(private http: HttpClient,
                private userQuery: UserQuery,
                private projectStore: ProjectStore,
                private projectQuery: ProjectQuery
    ) { }

    public createNewProject(payload: any): Observable<string> {
        const userId = this.userQuery.getCurrentUser().id;
        const params = new HttpParams()
            .set('userId', userId);
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.post<MessageResponse>(`${proxyConfig.target}/admin/new/project`, payload, {params, headers})
            .pipe(map((res: MessageResponse) => res.message));
    }

    public fetchProjects(): Observable<Project[]> {
        return this.http.get<Array<Project>>(`${proxyConfig.target}/projects/all`)
            .pipe(tap((projects: Project[]) => this.projectStore.update({projects})));
    }

    public fetchProjectMedia(projectId: string): Observable<ProjectMedia[]> {
        return this.http.get<ProjectMedia[]>(`${proxyConfig.target}/projects/media/${projectId}`)
            .pipe(tap((projectMedia: ProjectMedia[]) => {
                const current = this.projectQuery.getAllProjectMedia();
                current.set(projectId, projectMedia);
                this.projectStore.update({projectMedia: current});
            }))
    }
}