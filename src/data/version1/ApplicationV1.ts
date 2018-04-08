let _ = require('lodash');

import { IdGenerator } from 'pip-services-commons-node';
import { IStringIdentifiable } from 'pip-services-commons-node';

export class ApplicationV1 implements IStringIdentifiable {
    public id: string;
    public name: string;
    public description?: string;
    public product: string;
    public copyrights?: string;
    public url?: string;
    public min_ver?: number;
    public max_ver?: number;
}