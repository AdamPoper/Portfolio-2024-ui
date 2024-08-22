export class Project {
    public title: string;
    public description: string;
    public github: string;
    public url: string;
    public technologies: string;
    public id: string;

    constructor(args: any) {
        Object.assign(this, args);
    }
}