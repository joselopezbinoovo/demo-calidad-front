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


/**
 * (tsType: @loopback/repository-json-schema#Optional<Omit<S3File, \'id\'>, \'xBveFormulariosId\'>, schemaOptions: { exclude: [ \'id\' ], optional: [ \'xBveFormulariosId\' ] })
 */
export interface S3FileOptionalXBveFormulariosIdExcludingId { 
    fileName: string;
    file: string;
    mime: string;
    size: number;
    bucket: string;
    createdAt: string;
    updatedAt: string;
}

