import { Component } from "@angular/core";

import { UserPreferenceService } from "./user-preference.service";
import { UserPreference } from "./user-preference.model";
import { TokenStorage } from "../login/token.storage";

@Component({
    selector: 'app-comp',
    templateUrl: './user-preference.component.html'
})
export class UserPreferenceComponent {

    userPreference: UserPreference = new UserPreference();
    editing: boolean = false;

    constructor(
        private token: TokenStorage,
        private userPreferenceService: UserPreferenceService) {
    }

    ngOnInit() {
        this.userPreferenceService.getCurrentUserPreference()
            .subscribe(data => {
                if(data) {
                    this.userPreference = data;
                }
            });
    }

    save() {
        this.token.savePagination(this.userPreference.pagination);
        this.userPreferenceService.updateUserPreference(this.userPreference)
            .subscribe(data => {
                this.userPreference = data;
            });
        this.editing = false;
    }
    
}