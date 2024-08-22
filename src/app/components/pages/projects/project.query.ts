import { Injectable } from "@angular/core";
import { Query } from "@datorama/akita";
import { ProjectState, ProjectStore } from "./project.store";
import { ProjectMedia } from "src/app/models/project-media";

@Injectable({providedIn: 'root'})
export class ProjectQuery extends Query<ProjectState> {

    projects$ = this.select('projects');

    constructor(store: ProjectStore) {
        super(store);
    }

    public getAllProjectMedia(): Map<string, ProjectMedia[]> {
        return this.getValue().projectMedia;
    }
}