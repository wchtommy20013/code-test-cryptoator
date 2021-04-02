import { IRequestParam } from "@server/application/decorators/model/IRequestParam";

export interface ISwaggerMethod {
    name: string;
    path: string;
    requiredParameters?: IRequestParam[];
}
