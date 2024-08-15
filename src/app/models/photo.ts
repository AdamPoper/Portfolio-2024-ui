export class Photo {
    id: number;
    name: string;
    buffer: string;

    constructor(args: any) {
        Object.assign(this, args);
    }
}