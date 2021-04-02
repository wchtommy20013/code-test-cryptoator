import { RequestParameterKey } from '../Route';
import { IRequestParam } from './IRequestParam';

/**
 * Retreive information from request header.
 *
 * Usage example:
 * public async list(@Headers headers: ISomeBodyInterface) {
 */
// tslint:disable-next-line:function-name
export function Headers(target: Object, propertyKey: string | symbol, parameterIndex: number) {
    const params: IRequestParam[] = Reflect.getOwnMetadata(RequestParameterKey, target, propertyKey) || [];
    params.push({
        index: parameterIndex,
        dataType: 'headers',
    });
    Reflect.defineMetadata(RequestParameterKey, params, target, propertyKey);
}

/**
 * Retreive one data from request header.
 *
 * Usage example:
 * public async list(@Header('dataName') header: ISomeBodyInterface) {
 */
// tslint:disable-next-line:function-name
export function Header(dataName?: string) {
    return (target: Object, propertyKey: string | symbol, parameterIndex: number) => {
        const params: IRequestParam[] = Reflect.getOwnMetadata(RequestParameterKey, target, propertyKey) || [];
        params.push({
            index: parameterIndex,
            dataType: 'headers',
            dataName: dataName,
        });
        Reflect.defineMetadata(RequestParameterKey, params, target, propertyKey);
    }
}
