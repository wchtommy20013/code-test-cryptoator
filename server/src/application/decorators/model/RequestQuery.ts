import { RequestParameterKey } from '../Route';
import { IRequestParam } from './IRequestParam';

/**
 * Retreive information from request query.
 *
 * Usage example:
 * public async list(@RequestQuery queries: ISomeBodyInterface) {
 */
// tslint:disable-next-line:function-name
export function Queries(target: Object, propertyKey: string | symbol, parameterIndex: number) {
    const params: IRequestParam[] = Reflect.getOwnMetadata(RequestParameterKey, target, propertyKey) || [];
    params.push({
        index: parameterIndex,
        dataType: 'query',
    });
    Reflect.defineMetadata(RequestParameterKey, params, target, propertyKey);
}

/**
 * Retreive one data from request query.
 *
 * Usage example:
 * public async list(@Query('dataName') query: ISomeBodyInterface) {
 */
// tslint:disable-next-line:function-name
export function Query(dataName?: string) {
    return (target: Object, propertyKey: string | symbol, parameterIndex: number) => {
        const params: IRequestParam[] = Reflect.getOwnMetadata(RequestParameterKey, target, propertyKey) || [];
        params.push({
            index: parameterIndex,
            dataType: 'query',
            dataName: dataName,
        });
        Reflect.defineMetadata(RequestParameterKey, params, target, propertyKey);
    }
}
