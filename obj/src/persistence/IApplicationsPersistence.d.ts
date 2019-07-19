import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IGetter } from 'pip-services3-data-node';
import { IWriter } from 'pip-services3-data-node';
import { ApplicationV1 } from '../data/version1/ApplicationV1';
export interface IApplicationsPersistence extends IGetter<ApplicationV1, string>, IWriter<ApplicationV1, string> {
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<ApplicationV1>) => void): void;
    getOneById(correlationId: string, id: string, callback: (err: any, item: ApplicationV1) => void): void;
    create(correlationId: string, item: ApplicationV1, callback: (err: any, item: ApplicationV1) => void): void;
    update(correlationId: string, item: ApplicationV1, callback: (err: any, item: ApplicationV1) => void): void;
    deleteById(correlationId: string, id: string, callback: (err: any, item: ApplicationV1) => void): void;
}
