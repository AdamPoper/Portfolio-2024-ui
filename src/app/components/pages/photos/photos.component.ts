import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, mergeMap, Observable, of } from 'rxjs';
import { Photo } from 'src/app/models/photo';
import { PhotoService } from 'src/app/service/photo.service';
import { SubSink } from 'src/app/sub-sink';
import { PhotoQuery } from './photo.query';

@Component({
	selector: 'app-photos',
	templateUrl: './photos.component.html',
	styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit, OnDestroy {
	private sub = new SubSink();
	public currentIndex = 0;
	private photoCount: number;

	constructor(private photoService: PhotoService, private photoQuery: PhotoQuery) {

	}

	ngOnInit(): void {
		this.sub.sink = this.photoService.fetchPhotoTotalCount()
			.pipe(mergeMap((count: number) => {
				this.photoCount = count;
				if (this.photoQuery.getAllPhotos() && this.photoQuery.getAllPhotos().length === count) {
					return of();
				}
				
				const pageSize = 3;
				const pageCount = Math.ceil(count / pageSize);
				const pageFetches = [...Array(pageCount)]
					.map((_, i) => i)
					.map(i => this.photoService.fetchPhotosPaged(pageSize, i));
				
				return combineLatest([...pageFetches]);
			})).subscribe();

		setInterval(() => {
			this.nextImage();
		}, 5000);
	}

	nextImage(): void {
		this.currentIndex = (this.currentIndex + 1) % this.photoCount;
	}

	get photos$(): Observable<Photo[]> {
		return this.photoQuery.photos$;
	}

	ngOnDestroy(): void {
		this.sub.unsubscribe();
	}
}
