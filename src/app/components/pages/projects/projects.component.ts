import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, map, mergeMap, Observable } from 'rxjs';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/service/project.service';
import { SubSink } from 'src/app/sub-sink';
import { ProjectQuery } from './project.query';
import { ProjectMedia } from 'src/app/models/project-media';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, OnDestroy {
    
    loadingMedia$ = new BehaviorSubject<boolean>(true);
    
    private sub = new SubSink();

    constructor(
        private projectService: ProjectService,
        private projectQuery: ProjectQuery
    ) {}

    ngOnInit(): void {
        this.sub.sink = this.projectService.fetchProjects()
            .pipe(mergeMap((projects: Project[]) => {
                const mediaQueries = projects.map(project => this.projectService.fetchProjectMedia(project.id));
                return combineLatest(mediaQueries);
            }))
            .subscribe(() => this.loadingMedia$.next(false));
    }

    getTechnologies(technologies: string): string[] {
        return technologies.split(';');
    }
    
    getProjectMedia(projectId: string): ProjectMedia[] {
        return this.projectQuery.getAllProjectMedia().get(projectId);
    }
    
    get projects$(): Observable<Project[]> {
        return this.projectQuery.projects$;
    }

    ngOnDestroy(): void {
        this.sub.sink.unsubscribe();
    }
}
