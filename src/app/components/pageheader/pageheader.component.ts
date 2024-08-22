import { Component } from '@angular/core';
import { routeDefinitions } from 'src/app/routing-definitions';

@Component({
    selector: 'app-pageheader',
    templateUrl: './pageheader.component.html',
    styleUrls: ['./pageheader.component.scss']
})
export class PageheaderComponent {
    readonly home = `/${routeDefinitions.HOME}`;
    readonly projects = `/${routeDefinitions.PROJECTS}`;
    readonly photos = `/${routeDefinitions.PHOTOS}`;
    readonly aboutMe = `/${routeDefinitions.ABOUT_ME}`;
}
