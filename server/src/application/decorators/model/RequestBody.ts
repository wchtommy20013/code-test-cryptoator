import { RequestParameterKey } from '../Route';
import { IRequestParam } from './IRequestParam';

/**
 * Retreive information from request body.
 *
 * Usage example:
 * public async list(@Body body: ISomeBodyInterface) {
 */
// tslint:disable-next-line:function-name
export function Body(target: Object, propertyKey: string | symbol, parameterIndex: number) {
    const params: IRequestParam[] = Reflect.getOwnMetadata(RequestParameterKey, target, propertyKey) || [];
    params.push({
        index: parameterIndex,
        dataType: 'body',
    });
    Reflect.defineMetadata(RequestParameterKey, params, target, propertyKey);
}

