import { Query } from "@datorama/akita";
import { UserState, UserStore } from "./user.store";
import { Injectable } from "@angular/core";
import { User } from "src/app/models/user";

@Injectable({providedIn: 'root'})
export class UserQuery extends Query<UserState> {

    constructor(store: UserStore) {
        super(store);
    }

    public getCurrentUser(): User {
        return this.store.getValue().currentUser;
    }
}