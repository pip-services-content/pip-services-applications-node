let _ = require('lodash');

import { IdGenerator } from 'pip-services-commons-node';
import { IStringIdentifiable } from 'pip-services-commons-node';
import { MultiString } from 'pip-services-commons-node';

export class ApplicationV1 implements IStringIdentifiable {
    public id: string;
    public name: MultiString;
    public description?: MultiString;
    public product: string;
    public group?: string;
    public copyrights?: string;
    public url?: string;
    public icon?: string;
    public min_ver?: number;
    public max_ver?: number;
}