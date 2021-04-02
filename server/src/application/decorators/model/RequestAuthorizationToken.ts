import { RequestParameterKey } from '../Route';
import { IRequestParam } from './IRequestParam';

/**
 * Retreive one data from request header.
 *
 * Usage example:
 * public async list(@AuthorizationToken('dataName') header: Authorization) {
 */
// tslint:disable-next-line:function-name
export function AuthorizationToken(target: Object, propertyKey: string | symbol, parameterIndex: number) {
        const params: IRequestParam[] = Reflect.getOwnMetadata(RequestParameterKey, target, propertyKey) || [];
        params.push({
            index: parameterIndex,
            dataType: 'authorization',
        });
        Reflect.defineMetadata(RequestParameterKey, params, target, propertyKey);
    }
