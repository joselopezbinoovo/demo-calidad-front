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

import { InlineObject } from '../model/models';
import { InlineResponse200 } from '../model/models';
import { LoopbackCount } from '../model/models';
import { NewXBveEmpleados } from '../model/models';
import { XBveEmpleados } from '../model/models';
import { XBveEmpleadosFilter } from '../model/models';
import { XBveEmpleadosFilter1 } from '../model/models';
import { XBveEmpleadosPartial } from '../model/models';
import { XBveEmpleadosWithRelations } from '../model/models';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';



@Injectable({
  providedIn: 'root'
})
export class XBveEmpleadosControllerService {

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
     * @param token 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public xBveEmpleadosControllerChecktoken(token: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<string>;
    public xBveEmpleadosControllerChecktoken(token: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpResponse<string>>;
    public xBveEmpleadosControllerChecktoken(token: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpEvent<string>>;
    public xBveEmpleadosControllerChecktoken(token: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json'}): Observable<any> {
        if (token === null || token === undefined) {
            throw new Error('Required parameter token was null or undefined when calling xBveEmpleadosControllerChecktoken.');
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

        return this.httpClient.get<string>(`${this.configuration.basePath}/x-bve-empleados/checktoken/${encodeURIComponent(String(token))}`,
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
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public xBveEmpleadosControllerCount(where?: { [key: string]: object; }, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<LoopbackCount>;
    public xBveEmpleadosControllerCount(where?: { [key: string]: object; }, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpResponse<LoopbackCount>>;
    public xBveEmpleadosControllerCount(where?: { [key: string]: object; }, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpEvent<LoopbackCount>>;
    public xBveEmpleadosControllerCount(where?: { [key: string]: object; }, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json'}): Observable<any> {

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

        return this.httpClient.get<LoopbackCount>(`${this.configuration.basePath}/x-bve-empleados/count`,
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
     * @param newXBveEmpleados 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public xBveEmpleadosControllerCreate(newXBveEmpleados?: NewXBveEmpleados, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<XBveEmpleados>;
    public xBveEmpleadosControllerCreate(newXBveEmpleados?: NewXBveEmpleados, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpResponse<XBveEmpleados>>;
    public xBveEmpleadosControllerCreate(newXBveEmpleados?: NewXBveEmpleados, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpEvent<XBveEmpleados>>;
    public xBveEmpleadosControllerCreate(newXBveEmpleados?: NewXBveEmpleados, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json'}): Observable<any> {

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

        return this.httpClient.post<XBveEmpleados>(`${this.configuration.basePath}/x-bve-empleados`,
            newXBveEmpleados,
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
    public xBveEmpleadosControllerDeleteById(id: number, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: undefined}): Observable<any>;
    public xBveEmpleadosControllerDeleteById(id: number, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: undefined}): Observable<HttpResponse<any>>;
    public xBveEmpleadosControllerDeleteById(id: number, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: undefined}): Observable<HttpEvent<any>>;
    public xBveEmpleadosControllerDeleteById(id: number, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: undefined}): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling xBveEmpleadosControllerDeleteById.');
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

        return this.httpClient.delete<any>(`${this.configuration.basePath}/x-bve-empleados/${encodeURIComponent(String(id))}`,
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
    public xBveEmpleadosControllerFind(filter?: XBveEmpleadosFilter1, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<Array<XBveEmpleadosWithRelations>>;
    public xBveEmpleadosControllerFind(filter?: XBveEmpleadosFilter1, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpResponse<Array<XBveEmpleadosWithRelations>>>;
    public xBveEmpleadosControllerFind(filter?: XBveEmpleadosFilter1, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpEvent<Array<XBveEmpleadosWithRelations>>>;
    public xBveEmpleadosControllerFind(filter?: XBveEmpleadosFilter1, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json'}): Observable<any> {

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

        return this.httpClient.get<Array<XBveEmpleadosWithRelations>>(`${this.configuration.basePath}/x-bve-empleados`,
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
    public xBveEmpleadosControllerFindById(id: number, filter?: XBveEmpleadosFilter, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<XBveEmpleadosWithRelations>;
    public xBveEmpleadosControllerFindById(id: number, filter?: XBveEmpleadosFilter, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpResponse<XBveEmpleadosWithRelations>>;
    public xBveEmpleadosControllerFindById(id: number, filter?: XBveEmpleadosFilter, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpEvent<XBveEmpleadosWithRelations>>;
    public xBveEmpleadosControllerFindById(id: number, filter?: XBveEmpleadosFilter, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json'}): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling xBveEmpleadosControllerFindById.');
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

        return this.httpClient.get<XBveEmpleadosWithRelations>(`${this.configuration.basePath}/x-bve-empleados/${encodeURIComponent(String(id))}`,
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
     * @param inlineObject 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public xBveEmpleadosControllerLogin(inlineObject: InlineObject, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<InlineResponse200>;
    public xBveEmpleadosControllerLogin(inlineObject: InlineObject, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpResponse<InlineResponse200>>;
    public xBveEmpleadosControllerLogin(inlineObject: InlineObject, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpEvent<InlineResponse200>>;
    public xBveEmpleadosControllerLogin(inlineObject: InlineObject, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json'}): Observable<any> {
        if (inlineObject === null || inlineObject === undefined) {
            throw new Error('Required parameter inlineObject was null or undefined when calling xBveEmpleadosControllerLogin.');
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

        return this.httpClient.post<InlineResponse200>(`${this.configuration.basePath}/x-bve-empleados/login`,
            inlineObject,
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
     * @param xBveEmpleados 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public xBveEmpleadosControllerReplaceById(id: number, xBveEmpleados?: XBveEmpleados, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: undefined}): Observable<any>;
    public xBveEmpleadosControllerReplaceById(id: number, xBveEmpleados?: XBveEmpleados, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: undefined}): Observable<HttpResponse<any>>;
    public xBveEmpleadosControllerReplaceById(id: number, xBveEmpleados?: XBveEmpleados, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: undefined}): Observable<HttpEvent<any>>;
    public xBveEmpleadosControllerReplaceById(id: number, xBveEmpleados?: XBveEmpleados, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: undefined}): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling xBveEmpleadosControllerReplaceById.');
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

        return this.httpClient.put<any>(`${this.configuration.basePath}/x-bve-empleados/${encodeURIComponent(String(id))}`,
            xBveEmpleados,
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
     * @param xBveEmpleadosPartial 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public xBveEmpleadosControllerUpdateAll(where?: { [key: string]: object; }, xBveEmpleadosPartial?: XBveEmpleadosPartial, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<LoopbackCount>;
    public xBveEmpleadosControllerUpdateAll(where?: { [key: string]: object; }, xBveEmpleadosPartial?: XBveEmpleadosPartial, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpResponse<LoopbackCount>>;
    public xBveEmpleadosControllerUpdateAll(where?: { [key: string]: object; }, xBveEmpleadosPartial?: XBveEmpleadosPartial, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpEvent<LoopbackCount>>;
    public xBveEmpleadosControllerUpdateAll(where?: { [key: string]: object; }, xBveEmpleadosPartial?: XBveEmpleadosPartial, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json'}): Observable<any> {

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

        return this.httpClient.patch<LoopbackCount>(`${this.configuration.basePath}/x-bve-empleados`,
            xBveEmpleadosPartial,
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
     * @param xBveEmpleadosPartial 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public xBveEmpleadosControllerUpdateById(id: number, xBveEmpleadosPartial?: XBveEmpleadosPartial, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: undefined}): Observable<any>;
    public xBveEmpleadosControllerUpdateById(id: number, xBveEmpleadosPartial?: XBveEmpleadosPartial, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: undefined}): Observable<HttpResponse<any>>;
    public xBveEmpleadosControllerUpdateById(id: number, xBveEmpleadosPartial?: XBveEmpleadosPartial, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: undefined}): Observable<HttpEvent<any>>;
    public xBveEmpleadosControllerUpdateById(id: number, xBveEmpleadosPartial?: XBveEmpleadosPartial, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: undefined}): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling xBveEmpleadosControllerUpdateById.');
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

        return this.httpClient.patch<any>(`${this.configuration.basePath}/x-bve-empleados/${encodeURIComponent(String(id))}`,
            xBveEmpleadosPartial,
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
