import { Injectable } from "@angular/core";
import { Query } from "@datorama/akita";
import { PhotoState, PhotoStore } from "./photo.store";
import { Photo } from "src/app/models/photo";

@Injectable({providedIn: 'root'})
export class PhotoQuery extends Query<PhotoState> {

    photos$ = this.select('photos');

    constructor(store: PhotoStore) {
        super(store);
    }

    getAllPhotos(): Photo[] {
        return this.getValue().photos;
    }
}