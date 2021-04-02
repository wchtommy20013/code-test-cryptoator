import { RequestParameterKey } from '../Route';
import { IRequestParam } from './IRequestParam';

/**
 * Retreive information from request file (field name: file) (multipart).
 *
 * Usage example:
 * 
 * `singleFile(@SingleFile('field') file: Express.Multer.File)`
 */
export function SingleFile(dataName?: string) {
    return (target: Object, propertyKey: string | symbol, parameterIndex: number) => {
        const params: IRequestParam[] = Reflect.getOwnMetadata(RequestParameterKey, target, propertyKey) || [];
        params.push({
            index: parameterIndex,
            dataType: 'file',
            dataName: dataName,
        });
        Reflect.defineMetadata(RequestParameterKey, params, target, propertyKey);
    }
}

/**
 * Retreive information from request file (field name: file) (multipart).
 *
 * Usage example:
 * 
 * `multipleFiles(@MultipleFiles('field') files: Express.Multer.File[])`
 */
export function MultipleFiles(dataName?: string) {
    return (target: Object, propertyKey: string | symbol, parameterIndex: number) => {
        const params: IRequestParam[] = Reflect.getOwnMetadata(RequestParameterKey, target, propertyKey) || [];
        params.push({
            index: parameterIndex,
            dataType: 'files',
            dataName: dataName,
        });
        Reflect.defineMetadata(RequestParameterKey, params, target, propertyKey);
    }
}
