import { RequestParameterKey } from '../Route';
import { IRequestParam } from './IRequestParam';

/**
 * Retreive Express response.
 *
 * Usage example:
 * public async response(@ResponseData body: Response) {
 */
// tslint:disable-next-line:function-name
export function ResponseData(target: Object, propertyKey: string | symbol, parameterIndex: number) {
    const params: IRequestParam[] = Reflect.getOwnMetadata(RequestParameterKey, target, propertyKey) || [];
    params.push({
        index: parameterIndex,
        dataType: 'response',
    });
    Reflect.defineMetadata(RequestParameterKey, params, target, propertyKey);
}

