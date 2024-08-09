import { Inject, Injectable } from "@angular/core";
import { Store, StoreConfig } from "@datorama/akita";
import { User } from "src/app/models/user";

export interface UserState {
    currentUser: User | null;
}

function createInitialState() {
    return {
        currentUser: null
    } as UserState;
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'user'})
export class UserStore extends Store<UserState> {
    constructor() { super(createInitialState()); }
}