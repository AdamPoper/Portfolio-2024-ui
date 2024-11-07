import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import { SubSink } from 'src/app/sub-sink';
import { UserQuery } from '../current-user/user-query';
import { UserService } from '../current-user/user.service';

@Component({
    selector: 'app-admin-panel',
    templateUrl: './admin-panel.component.html',
    styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit, OnDestroy {
	private sub = new SubSink();
	private panel = new BehaviorSubject<number>(1);
	fileStoragePreference: boolean;

	constructor(private userQuery: UserQuery,
				private userService: UserService
	) {}

	ngOnInit(): void {
		this.fileStoragePreference = this.userQuery.getCurrentUser().file_loc_ind === 1
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

	onSavePreferences(): void {
		this.sub.sink = this.userService.updateFileStoragePreference(
			this.userQuery.getCurrentUser().id,
			this.fileStoragePreference ? 1 : 0
		).subscribe({
			next: (message: string) => alert(message),
			error: () => alert('Error on preference save')
		});
	}

	ngOnDestroy(): void {
		this.sub.unsubscribe();
	}
}
