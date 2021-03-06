import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const CUREENT_USER = 'currentUser';
const CUREENT_USER_ID = 'currentUserId';
const SUBSCRIBED_ERROR = 'subscribedError';
const PAGINATION = 'pagination';
const ERROR_TABLE_COLUMNS = 'errorTableColumns';

@Injectable()
export class TokenStorage {

    constructor() { }

    signOut() {
        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.removeItem(CUREENT_USER);
        window.sessionStorage.removeItem(CUREENT_USER_ID);
        window.sessionStorage.removeItem(SUBSCRIBED_ERROR);
        window.sessionStorage.clear();
    }

    public saveToken(token: string) {
        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.setItem(TOKEN_KEY, token);
    }

    public getToken(): string {
        return sessionStorage.getItem(TOKEN_KEY);
    }

    public saveCurrentUser(currentUser: string) {
        window.sessionStorage.removeItem(CUREENT_USER);
        window.sessionStorage.setItem(CUREENT_USER, currentUser);
    }

    public getCurrentUser(): string {
        return sessionStorage.getItem(CUREENT_USER);
    }

    public saveCurrentUserId(currentUserId: string) {
        window.sessionStorage.removeItem(CUREENT_USER_ID);
        window.sessionStorage.setItem(CUREENT_USER_ID, currentUserId);
    }

    public getCurrentUserId(): string {
        return sessionStorage.getItem(CUREENT_USER_ID);
    }

    public saveSubscribedError(subscribedErrors: string) {
        window.sessionStorage.removeItem(SUBSCRIBED_ERROR);
        window.sessionStorage.setItem(SUBSCRIBED_ERROR, subscribedErrors);
    }

    public getSubscribedErrorIds(): string {
        return sessionStorage.getItem(SUBSCRIBED_ERROR);
    }

    public addSubscribedErrorIds(subscribedErrorId): string {
        let subscribedErrorIds = this.getSubscribedErrorIds();
        window.sessionStorage.removeItem(SUBSCRIBED_ERROR);
        this.saveSubscribedError(subscribedErrorIds + "," + subscribedErrorId);
        return this.getSubscribedErrorIds();
    }

    public removeSubscribedErrorIds(unSubscribedErrorId): string {
        let subscribedErrorIds = this.getSubscribedErrorIds();
        window.sessionStorage.removeItem(SUBSCRIBED_ERROR);
        let subscribedErrorIdsArr = subscribedErrorIds.split(",");
        let unSubscribedErrorIdsArr = unSubscribedErrorId.split(",");
        unSubscribedErrorIdsArr.forEach(unSubscribedErrorId => {
            let index = subscribedErrorIdsArr.indexOf("" + unSubscribedErrorId);
            if (index > -1) {
                subscribedErrorIdsArr.splice(index, 1);
            }
        });
        this.saveSubscribedError(subscribedErrorIdsArr.join(","));
        return this.getSubscribedErrorIds();
    }

    public savePagination(pagination: string) {
        window.sessionStorage.removeItem(PAGINATION);
        window.sessionStorage.setItem(PAGINATION, pagination);
    }

    public getPagination(): string {
        return sessionStorage.getItem(PAGINATION);
    }

    public saveErrorTableColumns(errorTableColumns: string) {
        window.sessionStorage.removeItem(ERROR_TABLE_COLUMNS);
        window.sessionStorage.setItem(ERROR_TABLE_COLUMNS, errorTableColumns);
    }

    public getErrorTableColumns(): string {
        return sessionStorage.getItem(ERROR_TABLE_COLUMNS);
    }

}
