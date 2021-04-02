import { RequestParameterKey } from '../Route';
import { IRequestParam } from './IRequestParam';

/**
 * Retreive information from user.
 *
 * Usage example:
 * public async list(@User user: IUser) {
 */
// tslint:disable-next-line:function-name
export function User(target: Object, propertyKey: string | symbol, parameterIndex: number) {
    const params: IRequestParam[] = Reflect.getOwnMetadata(RequestParameterKey, target, propertyKey) || [];
    params.push({
        index: parameterIndex,
        dataType: 'user',
    });
    Reflect.defineMetadata(RequestParameterKey, params, target, propertyKey);
}
