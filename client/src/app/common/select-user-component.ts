import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { UserNameGroup } from '../user/user-name-group.model';


@Component({})
export class SelectUserComponent {

    userNameGroups: UserNameGroup[]
    userNameGroupOptions: Observable<UserNameGroup[]>;
    userNameForm: FormGroup = this.fb.group({
        userNameGroup: '',
    });

    constructor(
        protected fb: FormBuilder,
        protected userService: UserService) {
    }

    ngOnInit() {
        this.userService.getAssignee()
            .subscribe(data => {
                this.userNameGroups = data
                this.userNameGroupOptions = this.userNameForm.get('userNameGroup')!.valueChanges
                    .pipe(
                        startWith(''),
                        map(value => this._filterGroup(value))
                    );
            });
    }

    protected _filterGroup(value: any): UserNameGroup[] {
        if (value) {
            return this.userNameGroups
                .map(group => ({ letter: group.letter, assignees: _filter(group.assignees, value) }))
                .filter(group => group.assignees.length > 0);
        }
        return this.userNameGroups;
    }

    displayFn(user?: User): string | undefined {
        return user ? user.firstName + " " + user.lastName : undefined;
    }

}

export const _filter = (options: User[], user: User): User[] => {
    const filterValue = user.firstName.toLowerCase();
    return options.filter(option => option.firstName.toLowerCase().indexOf(filterValue) === 0);
};
