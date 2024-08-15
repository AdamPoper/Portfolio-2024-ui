import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, mergeMap, shareReplay, tap } from 'rxjs';
import { Photo } from 'src/app/models/photo';
import { PhotoService } from 'src/app/service/photo.service';
import { SubSink } from 'src/app/sub-sink';

@Component({
    selector: 'app-admin-panel',
    templateUrl: './admin-panel.component.html',
    styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit, OnDestroy {

	photos: Array<Photo>;
	
	private newPhotoFile: any;
	private newPhotoBuffer: string;
	private editing = new BehaviorSubject<boolean>(false);
	private panel = new BehaviorSubject<number>(0);
	private sub = new SubSink();

	constructor(private photoService: PhotoService) {}

	ngOnInit(): void {
		this.sub.sink = this.photoService.fetchAllPhotos().subscribe((photos: Photo[]) => {
			this.photos = photos.slice();
		});
	}

	onChangePanel(_panel: number): void {
		this.panel.next(_panel);
	}

	isSelected(value: number): boolean {
		return this.panel.value === value;
	}

	getPanel(): number {
		return this.panel.getValue();
	}

	addNewPhoto(event: any): void {
		this.newPhotoFile = event.target.files[0];
		console.log(this.newPhotoFile);
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
					error:() => alert('Error submitting photo'),
					complete: () => {
						this.newPhotoBuffer = null;
						this.newPhotoFile = null;
					}
				});
		}
	}

	toggleEditing(): void {
		this.editing.next(!this.editing.value);
	}

	isEditing(): boolean {
		return this.editing.value;
	}

	get photoDate(): string {
		return new Date().toLocaleDateString();
	}

	ngOnDestroy(): void {
		this.sub.unsubscribe();
	}
}
