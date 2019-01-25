import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
    users: any[] = [];

    constructor() {
        let userDetails = this.getItem('userDetails');  
        if (userDetails) {
            this.users = userDetails;
        }
    }

    setLoggedInUser(user: Object) {
        window.sessionStorage.setItem('loggedInUser', JSON.stringify(user));
    }

    getLoggedInUser() {
        return JSON.parse(window.sessionStorage.getItem('loggedInUser'));
    }

    setItem(key: string, value: Object) {
        this.users.push(value);
        window.localStorage.setItem(key, JSON.stringify(this.users));
    }

    getItem(key: string) {
        return JSON.parse(window.localStorage.getItem(key));
    }

}
