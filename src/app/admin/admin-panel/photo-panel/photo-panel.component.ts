import { Component, OnInit, OnDestroy } from '@angular/core';
import { PhotoService } from 'src/app/service/photo.service'
import { Photo } from 'src/app/models/photo';
import { tap, Observable, mergeMap } from 'rxjs';
import { SubSink } from 'src/app/sub-sink';

@Component({
	selector: 'app-photo-panel',
	templateUrl: './photo-panel.component.html',
	styleUrls: ['./photo-panel.component.scss']
})
export class PhotoPanelComponent implements OnInit, OnDestroy {
	photos: Array<Photo>;
	
	private newPhotoFile: any;
	private newPhotoBuffer: string;
	private sub = new SubSink();

	constructor(private photoService: PhotoService) { }

	ngOnInit(): void {
		this.sub.sink = this.photoService.fetchAllPhotos().subscribe((photos: Photo[]) => {
			this.photos = photos.slice();
		});
	}

	addNewPhoto(event: any): void {
		this.newPhotoFile = event.target.files[0];
		const reader = new FileReader();
		reader.onload = () => this.newPhotoBuffer = reader.result?.toString();
		reader.readAsDataURL(this.newPhotoFile);
	}

	onSubmitPhoto(): void {
		if (this.newPhotoFile) {
			const description = this.newPhotoFile.name.split('.');
			const payload = {
				name: description[0],
				type: description[1],
				buffer: this.newPhotoBuffer,
			}

			this.sub.sink = this.photoService.sendNewPhoto(payload)
				.pipe(mergeMap(() => this.photoService.fetchAllPhotos()))
				.pipe(tap((photos: Array<Photo>) => this.photos = photos.slice()))
				.subscribe({
					next: () => alert('Successfully submitted new photo'),
					error: () => alert('Error submitting photo'),
					complete: () => {
						this.newPhotoBuffer = null;
						this.newPhotoFile = null;
					}
				});
		}
	}

	get photoDate(): string {
		return new Date().toLocaleDateString();
	}

	ngOnDestroy(): void {
		this.sub.unsubscribe();
	}
}
