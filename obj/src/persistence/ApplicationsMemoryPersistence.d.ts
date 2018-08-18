import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { IdentifiableMemoryPersistence } from 'pip-services-data-node';
import { ApplicationV1 } from '../data/version1/ApplicationV1';
import { IApplicationsPersistence } from './IApplicationsPersistence';
export declare class ApplicationsMemoryPersistence extends IdentifiableMemoryPersistence<ApplicationV1, string> implements IApplicationsPersistence {
    constructor();
    private matchString(value, search);
    private matchSearch(item, search);
    private composeFilter(filter);
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<ApplicationV1>) => void): void;
}
