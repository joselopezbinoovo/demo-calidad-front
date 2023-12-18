/**
 * bsi-qf-backend
 * Formularios de Inspección de Calidad BSI
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { S3FileExcludingId } from './s3FileExcludingId';
import { FormInputExcludingId } from './formInputExcludingId';


/**
 * (tsType: Omit<FormBlock, \'id\'>, schemaOptions: { exclude: [ \'id\' ] })
 */
export interface FormBlockExcludingId { 
    name?: string;
    blockNumber?: number;
    user?: string;
    status?: string;
    date?: string;
    language?: Array<object>;
    inputs?: Array<FormInputExcludingId>;
    imagenes?: Array<S3FileExcludingId>;
}
