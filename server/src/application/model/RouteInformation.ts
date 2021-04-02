export class RouteInformation {
    public path!: string;
    public noAuth?: boolean;

    public constructor(obj: Partial<RouteInformation>){
        Object.assign(this, obj)
    }
}
