import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { IdentifiableMongoDbPersistence } from 'pip-services-mongodb-node';
import { ApplicationV1 } from '../data/version1/ApplicationV1';
import { IApplicationsPersistence } from './IApplicationsPersistence';
export declare class ApplicationsMongoDbPersistence extends IdentifiableMongoDbPersistence<ApplicationV1, string> implements IApplicationsPersistence {
    constructor();
    private composeFilter(filter);
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<ApplicationV1>) => void): void;
}
