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
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent, HttpParameterCodec }       from '@angular/common/http';
import { CustomHttpParameterCodec }                          from '../encoder';
import { Observable }                                        from 'rxjs';

import { Form } from '../model/models';
import { FormFilter } from '../model/models';
import { FormFilter1 } from '../model/models';
import { FormPartial } from '../model/models';
import { FormWithRelations } from '../model/models';
import { LoopbackCount } from '../model/models';
import { NewForm } from '../model/models';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';



@Injectable({
  providedIn: 'root'
})
export class FormControllerService {

    protected basePath = 'http://localhost:3000/api/v1';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();
    public encoder: HttpParameterCodec;

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (configuration) {
            this.configuration = configuration;
        }
        if (typeof this.configuration.basePath !== 'string') {
            if (typeof basePath !== 'string') {
                basePath = this.basePath;
            }
            this.configuration.basePath = basePath;
        }
        this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
    }


    private addToHttpParams(httpParams: HttpParams, value: any, key?: string): HttpParams {
        if (!key && typeof value === "object" && value instanceof Date === false) {
            httpParams = this.addToHttpParamsRecursive(httpParams, value);
        } else {
            httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
        }
        return httpParams;
    }

    private addToHttpParamsRecursive(httpParams: HttpParams, value?: any, key?: string): HttpParams {
        if (value == null) {
            return httpParams;
        }
        if (typeof value === "object") {
            httpParams = httpParams.append(key, JSON.stringify(value));
        } else if (key != null) {
            httpParams = httpParams.append(key, value);
        } else {
            throw Error("key may not be null if value is not object or array");
        }
        return httpParams;
    }

    /**
     * @param where 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public formControllerCount(where?: { [key: string]: object; }, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<LoopbackCount>;
    public formControllerCount(where?: { [key: string]: object; }, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpResponse<LoopbackCount>>;
    public formControllerCount(where?: { [key: string]: object; }, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpEvent<LoopbackCount>>;
    public formControllerCount(where?: { [key: string]: object; }, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json'}): Observable<any> {

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (where !== undefined && where !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>where, 'where');
        }

        let headers = this.defaultHeaders;

        let credential: string | undefined;
        // authentication (jwt) required
        credential = this.configuration.lookupCredential('jwt');
        if (credential) {
            headers = headers.set('Authorization', 'Bearer ' + credential);
        }

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        let responseType_: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType_ = 'text';
        }

        return this.httpClient.get<LoopbackCount>(`${this.configuration.basePath}/forms/count`,
            {
                params: queryParameters,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * @param newForm 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public formControllerCreate(newForm?: NewForm, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<Form>;
    public formControllerCreate(newForm?: NewForm, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpResponse<Form>>;
    public formControllerCreate(newForm?: NewForm, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpEvent<Form>>;
    public formControllerCreate(newForm?: NewForm, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json'}): Observable<any> {

        let headers = this.defaultHeaders;

        let credential: string | undefined;
        // authentication (jwt) required
        credential = this.configuration.lookupCredential('jwt');
        if (credential) {
            headers = headers.set('Authorization', 'Bearer ' + credential);
        }

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType_ = 'text';
        }

        return this.httpClient.post<Form>(`${this.configuration.basePath}/forms`,
            newForm,
            {
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public formControllerDeleteById(id: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: undefined}): Observable<any>;
    public formControllerDeleteById(id: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: undefined}): Observable<HttpResponse<any>>;
    public formControllerDeleteById(id: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: undefined}): Observable<HttpEvent<any>>;
    public formControllerDeleteById(id: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: undefined}): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling formControllerDeleteById.');
        }

        let headers = this.defaultHeaders;

        let credential: string | undefined;
        // authentication (jwt) required
        credential = this.configuration.lookupCredential('jwt');
        if (credential) {
            headers = headers.set('Authorization', 'Bearer ' + credential);
        }

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        let responseType_: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType_ = 'text';
        }

        return this.httpClient.delete<any>(`${this.configuration.basePath}/forms/${encodeURIComponent(String(id))}`,
            {
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * @param filter 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public formControllerFind(filter?: FormFilter1, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<Array<FormWithRelations>>;
    public formControllerFind(filter?: FormFilter1, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpResponse<Array<FormWithRelations>>>;
    public formControllerFind(filter?: FormFilter1, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpEvent<Array<FormWithRelations>>>;
    public formControllerFind(filter?: FormFilter1, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json'}): Observable<any> {

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (filter !== undefined && filter !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>filter, 'filter');
  }

        let headers = this.defaultHeaders;

        let credential: string | undefined;
        // authentication (jwt) required
        credential = this.configuration.lookupCredential('jwt');
        if (credential) {
            headers = headers.set('Authorization', 'Bearer ' + credential);
        }

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        let responseType_: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType_ = 'text';
        }

        return this.httpClient.get<Array<FormWithRelations>>(`${this.configuration.basePath}/forms`,
            {
                params: queryParameters,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * @param id 
     * @param filter 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public formControllerFindById(id: string, filter?: FormFilter, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<FormWithRelations>;
    public formControllerFindById(id: string, filter?: FormFilter, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpResponse<FormWithRelations>>;
    public formControllerFindById(id: string, filter?: FormFilter, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpEvent<FormWithRelations>>;
    public formControllerFindById(id: string, filter?: FormFilter, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json'}): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling formControllerFindById.');
        }

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (filter !== undefined && filter !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>filter, 'filter');
  }

        let headers = this.defaultHeaders;

        let credential: string | undefined;
        // authentication (jwt) required
        credential = this.configuration.lookupCredential('jwt');
        if (credential) {
            headers = headers.set('Authorization', 'Bearer ' + credential);
        }

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        let responseType_: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType_ = 'text';
        }

        return this.httpClient.get<FormWithRelations>(`${this.configuration.basePath}/forms/${encodeURIComponent(String(id))}`,
            {
                params: queryParameters,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * @param id 
     * @param form 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public formControllerReplaceById(id: string, form?: Form, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: undefined}): Observable<any>;
    public formControllerReplaceById(id: string, form?: Form, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: undefined}): Observable<HttpResponse<any>>;
    public formControllerReplaceById(id: string, form?: Form, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: undefined}): Observable<HttpEvent<any>>;
    public formControllerReplaceById(id: string, form?: Form, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: undefined}): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling formControllerReplaceById.');
        }

        let headers = this.defaultHeaders;

        let credential: string | undefined;
        // authentication (jwt) required
        credential = this.configuration.lookupCredential('jwt');
        if (credential) {
            headers = headers.set('Authorization', 'Bearer ' + credential);
        }

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType_ = 'text';
        }

        return this.httpClient.put<any>(`${this.configuration.basePath}/forms/${encodeURIComponent(String(id))}`,
            form,
            {
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * @param where 
     * @param formPartial 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public formControllerUpdateAll(where?: { [key: string]: object; }, formPartial?: FormPartial, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<LoopbackCount>;
    public formControllerUpdateAll(where?: { [key: string]: object; }, formPartial?: FormPartial, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpResponse<LoopbackCount>>;
    public formControllerUpdateAll(where?: { [key: string]: object; }, formPartial?: FormPartial, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpEvent<LoopbackCount>>;
    public formControllerUpdateAll(where?: { [key: string]: object; }, formPartial?: FormPartial, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json'}): Observable<any> {

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (where !== undefined && where !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>where, 'where');
        }

        let headers = this.defaultHeaders;

        let credential: string | undefined;
        // authentication (jwt) required
        credential = this.configuration.lookupCredential('jwt');
        if (credential) {
            headers = headers.set('Authorization', 'Bearer ' + credential);
        }

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType_ = 'text';
        }

        return this.httpClient.patch<LoopbackCount>(`${this.configuration.basePath}/forms`,
            formPartial,
            {
                params: queryParameters,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * @param id 
     * @param formPartial 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public formControllerUpdateById(id: string, formPartial?: FormPartial, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: undefined}): Observable<any>;
    public formControllerUpdateById(id: string, formPartial?: FormPartial, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: undefined}): Observable<HttpResponse<any>>;
    public formControllerUpdateById(id: string, formPartial?: FormPartial, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: undefined}): Observable<HttpEvent<any>>;
    public formControllerUpdateById(id: string, formPartial?: FormPartial, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: undefined}): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling formControllerUpdateById.');
        }

        let headers = this.defaultHeaders;

        let credential: string | undefined;
        // authentication (jwt) required
        credential = this.configuration.lookupCredential('jwt');
        if (credential) {
            headers = headers.set('Authorization', 'Bearer ' + credential);
        }

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType_ = 'text';
        }

        return this.httpClient.patch<any>(`${this.configuration.basePath}/forms/${encodeURIComponent(String(id))}`,
            formPartial,
            {
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
