import { RequestParameterKey } from '../Route';
import { IRequestParam } from './IRequestParam';

/**
 * Retreive Express request.
 *
 * Usage example:
 * public async request(@RequestData body: Request) {
 */
// tslint:disable-next-line:function-name
export function RequestData(target: Object, propertyKey: string | symbol, parameterIndex: number) {
    const params: IRequestParam[] = Reflect.getOwnMetadata(RequestParameterKey, target, propertyKey) || [];
    params.push({
        index: parameterIndex,
        dataType: 'request',
    });
    Reflect.defineMetadata(RequestParameterKey, params, target, propertyKey);
}

