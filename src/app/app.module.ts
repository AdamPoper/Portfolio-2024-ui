import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PageheaderComponent } from './components/pageheader/pageheader.component';
import { LoginComponent } from './admin/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { ProjectPanelComponent } from './admin/admin-panel/project-panel/project-panel.component';
import { PhotoPanelComponent } from './admin/admin-panel/photo-panel/photo-panel.component';
import { ProjectsComponent } from './components/pages/projects/projects.component';

@NgModule({
    declarations: [
      	AppComponent,
       	HomeComponent,
        PageheaderComponent,
        LoginComponent,
		LoginComponent,
  		AdminPanelComponent,
  		ProjectPanelComponent,
		PhotoPanelComponent,
  		ProjectsComponent
    ],
    imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		HttpClientModule,
		ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
