import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PageheaderComponent } from './components/pageheader/pageheader.component';
import { LoginComponent } from './admin/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';

@NgModule({
    declarations: [
      	AppComponent,
       	HomeComponent,
        PageheaderComponent,
        LoginComponent,
		LoginComponent,
  AdminPanelComponent
    ],
    imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
