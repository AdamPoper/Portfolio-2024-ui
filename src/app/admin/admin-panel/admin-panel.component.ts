import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, mergeMap, shareReplay, tap } from 'rxjs';
import { Photo } from 'src/app/models/photo';
import { PhotoService } from 'src/app/service/photo.service';
import { SubSink } from 'src/app/sub-sink';

@Component({
    selector: 'app-admin-panel',
    templateUrl: './admin-panel.component.html',
    styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent {

	private panel = new BehaviorSubject<number>(1);

	constructor() {}

	onChangePanel(_panel: number): void {
		this.panel.next(_panel);
	}

	isSelected(value: number): boolean {
		return this.panel.value === value;
	}

	getPanel(): number {
		return this.panel.getValue();
	}
}
