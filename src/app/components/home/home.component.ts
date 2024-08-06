import { Component } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
	readonly linkedIn = 'https://www.linkedin.com/in/adam-poper-9a83a6186/';
	readonly facebook = 'https://www.facebook.com/profile.php?id=100076237033401';
	readonly instagram = 'https://www.instagram.com/adamrpoper/';
	readonly email = 'mailto:adampoper@gmail.com';
}
