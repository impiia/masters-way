// @ts-nocheck
/* eslint-disable */
/**
 * Masters way API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface SchemasCreateUserPayload
 */
export interface SchemasCreateUserPayload {
    /**
     * 
     * @type {string}
     * @memberof SchemasCreateUserPayload
     */
    description: string;
    /**
     * 
     * @type {string}
     * @memberof SchemasCreateUserPayload
     */
    email: string;
    /**
     * 
     * @type {string}
     * @memberof SchemasCreateUserPayload
     */
    imageUrl: string | null;
    /**
     * 
     * @type {boolean}
     * @memberof SchemasCreateUserPayload
     */
    isMentor: boolean;
    /**
     * 
     * @type {string}
     * @memberof SchemasCreateUserPayload
     */
    name: string;
}

/**
 * Check if a given object implements the SchemasCreateUserPayload interface.
 */
export function instanceOfSchemasCreateUserPayload(
    value: object
): boolean {
    let isInstance = true;
    isInstance = isInstance && "description" in value;
    isInstance = isInstance && "email" in value;
    isInstance = isInstance && "imageUrl" in value;
    isInstance = isInstance && "isMentor" in value;
    isInstance = isInstance && "name" in value;

    return isInstance;
}

export function SchemasCreateUserPayloadFromJSON(json: any): SchemasCreateUserPayload {
    return SchemasCreateUserPayloadFromJSONTyped(json, false);
}

export function SchemasCreateUserPayloadFromJSONTyped(
    json: any,
    ignoreDiscriminator: boolean
): SchemasCreateUserPayload {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'description': json['description'],
        'email': json['email'],
        'imageUrl': json['imageUrl'],
        'isMentor': json['isMentor'],
        'name': json['name'],
    };
}


export function SchemasCreateUserPayloadToJSON(value?: SchemasCreateUserPayload | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'description': value.description,
        'email': value.email,
        'imageUrl': value.imageUrl,
        'isMentor': value.isMentor,
        'name': value.name,
    };
}

