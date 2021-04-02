import { RequestParameterKey } from '../Route';
import { IRequestParam } from './IRequestParam';

/**
 * Retreive information from request params.
 *
 * Usage example:
 * public async list(@Params params: ISomeBodyInterface) {
 */
// tslint:disable-next-line:function-name
export function Params(target: Object, propertyKey: string | symbol, parameterIndex: number) {
    const params: IRequestParam[] = Reflect.getOwnMetadata(RequestParameterKey, target, propertyKey) || [];
    params.push({
        index: parameterIndex,
        dataType: 'params',
    });
    Reflect.defineMetadata(RequestParameterKey, params, target, propertyKey);
}

/**
 * Retreive one data from request params.
 *
 * Usage example:
 * public async list(@Param('dataName') param: ISomeBodystInterface) {
 */
// tslint:disable-next-line:function-name
export function Param(dataName?: string) {
    return (target: Object, propertyKey: string | symbol, parameterIndex: number) => {
        const params: IRequestParam[] = Reflect.getOwnMetadata(RequestParameterKey, target, propertyKey) || [];
        params.push({
            index: parameterIndex,
            dataType: 'params',
            dataName: dataName,
        });
        Reflect.defineMetadata(RequestParameterKey, params, target, propertyKey);
    }
}
