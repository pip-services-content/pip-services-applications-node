import { IStringIdentifiable } from 'pip-services-commons-node';
import { MultiString } from 'pip-services-commons-node';
export declare class ApplicationV1 implements IStringIdentifiable {
    id: string;
    name: MultiString;
    description?: MultiString;
    product: string;
    group?: string;
    copyrights?: string;
    url?: string;
    icon?: string;
    min_ver?: number;
    max_ver?: number;
}
