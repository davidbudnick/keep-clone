/* tslint:disable */
/* eslint-disable */
/**
 * Keep Clone
 * Rest endpoints
 *
 * OpenAPI spec version: 1.0.11
 * Contact: apiteam@swagger.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/**
 * 
 * @export
 * @interface Note
 */
export interface Note {
    /**
     * 
     * @type {string}
     * @memberof Note
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof Note
     */
    userId: string;
    /**
     * 
     * @type {string}
     * @memberof Note
     */
    title: string;
    /**
     * 
     * @type {string}
     * @memberof Note
     */
    body: string;
    /**
     * 
     * @type {string}
     * @memberof Note
     */
    status: NoteStatusEnum;
    /**
     * 
     * @type {Date}
     * @memberof Note
     */
    createdAt: Date;
    /**
     * 
     * @type {Date}
     * @memberof Note
     */
    updatedAt: Date;
}

/**
    * @export
    * @enum {string}
    */
export enum NoteStatusEnum {
    ARCHIVED = 'ARCHIVED',
    DELETED = 'DELETED',
    ACTIVE = 'ACTIVE'
}

