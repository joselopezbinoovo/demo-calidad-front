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
import { FormBlockOptionalXBveFormulariosIdExcludingId } from './formBlockOptionalXBveFormulariosIdExcludingId';


/**
 * (tsType: @loopback/repository-json-schema#Optional<Omit<Form, \'id\'>, \'xBveFormulariosId\'>, schemaOptions: { title: \'NewFormInXBveFormularios\', exclude: [ \'id\' ], optional: [ \'xBveFormulariosId\' ] })
 */
export interface NewFormInXBveFormularios { 
    status: string;
    section: string;
    type: string;
    project: string;
    personInCharge: string;
    customer: string;
    salesOrder?: string;
    item: string;
    serialNumber: string;
    startDate: string;
    signature?: string;
    endDate?: string;
    blocks?: Array<FormBlockOptionalXBveFormulariosIdExcludingId>;
    xBveFormulariosId?: string;
}

