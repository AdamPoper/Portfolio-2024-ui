import { Injectable } from "@angular/core";
import { Store, StoreConfig } from "@datorama/akita";
import { Project } from "src/app/models/project";
import { ProjectMedia } from "src/app/models/project-media";

export interface ProjectState {
    projects: Project[],
    projectMedia: Map<string, ProjectMedia[]>;
}

function createInitialState() {
    return {
        projects: [],
        projectMedia: new Map<string, ProjectMedia[]>()
    } as ProjectState;
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'projects'})
export class ProjectStore extends Store<ProjectState> {

    constructor() {
        super(createInitialState());
    }
}