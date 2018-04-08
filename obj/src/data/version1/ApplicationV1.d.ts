import { IStringIdentifiable } from 'pip-services-commons-node';
export declare class ApplicationV1 implements IStringIdentifiable {
    id: string;
    name: string;
    description?: string;
    product: string;
    copyrights?: string;
    url?: string;
    min_ver?: number;
    max_ver?: number;
}
