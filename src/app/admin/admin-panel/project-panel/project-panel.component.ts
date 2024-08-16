import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SubSink } from 'src/app/sub-sink';
import { ProjectService } from 'src/app/service/project.service';

interface MediaFile {
	type: string;
	name: string;
	buffer: string;
}

@Component({
	selector: 'app-project-panel',
	templateUrl: './project-panel.component.html',
	styleUrls: ['./project-panel.component.scss']
})
export class ProjectPanelComponent implements OnInit {
	form: FormGroup;

	private mediaFiles: MediaFile[];
	private sub = new SubSink();

	constructor(private projectService: ProjectService) {}

	ngOnInit(): void {
		this.form = new FormGroup({
			title: new FormControl('', Validators.required),
			technologies: new FormControl('', Validators.required),
			description: new FormControl('', Validators.required),
			url: new FormControl(''),
			github: new FormControl('')
		});
	}

	onSubmitNewProject(): void {
		if (this.form.valid) {
			const data = this.form.value;
			const payload = {
				title: data.title,
				description: data.description,
				github: data.github,
				technologies: data.technologies,
				url: data.url,
				media: this.mediaFiles
			};
			this.sub.sink = this.projectService.createNewProject(payload).subscribe();
		}
	}

	uploadMedia(event: any): void {
		if (!this.mediaFiles || this.mediaFiles.length === 0) {
			this.mediaFiles = new Array<any>();
		}

		for (const f of event.target.files) {
			const reader = new FileReader();
			reader.onload = () => this.mediaFiles.push({
				name: f.name,
				buffer: reader.result?.toString()
			} as MediaFile);
			reader.readAsDataURL(f);
		}
	}
}
