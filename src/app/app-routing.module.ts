import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './admin/login/login.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { AuthGuard } from './auth.guard';
import { routeDefinitions } from './routing-definitions';
import { ProjectsComponent } from './components/pages/projects/projects.component';
import { PhotosComponent } from './components/pages/photos/photos.component';

const routes: Routes = [
	{ path: '', component: HomeComponent, canActivate: [AuthGuard] },
	{ path: routeDefinitions.HOME, component: HomeComponent, canActivate: [AuthGuard] },
	{ path: routeDefinitions.LOGIN, component: LoginComponent, canActivate: [AuthGuard] },
	{ path: routeDefinitions.ADMIN, component: AdminPanelComponent, canActivate: [AuthGuard] },
	{ path: routeDefinitions.PROJECTS, component: ProjectsComponent, canActivate: [AuthGuard] },
	{ path: routeDefinitions.PHOTOS, component: PhotosComponent, canActivate: [AuthGuard] }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
