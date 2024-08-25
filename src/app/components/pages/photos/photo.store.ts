import { Injectable } from "@angular/core";
import { Store, StoreConfig } from "@datorama/akita";
import { Photo } from "src/app/models/photo";

export interface PhotoState {
    photos: Photo[];
}

const createInitialState = () => {
    return {
        photos: []
    } as PhotoState;
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'photoStore'})
export class PhotoStore extends Store<PhotoState> {
    constructor() {
        super(createInitialState());
    }
}