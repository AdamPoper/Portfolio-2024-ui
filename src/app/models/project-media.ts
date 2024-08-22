export class ProjectMedia {
    public buffer: string;
    public name: string;
    public id: string;

    constructor(args: any) {
        Object.assign(this, args);
    }
}