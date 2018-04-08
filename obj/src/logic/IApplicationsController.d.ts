import { DataPage } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { ApplicationV1 } from '../data/version1/ApplicationV1';
export interface IApplicationsController {
    getApplications(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<ApplicationV1>) => void): void;
    getApplicationById(correlationId: string, application_id: string, callback: (err: any, application: ApplicationV1) => void): void;
    createApplication(correlationId: string, application: ApplicationV1, callback: (err: any, application: ApplicationV1) => void): void;
    updateApplication(correlationId: string, application: ApplicationV1, callback: (err: any, application: ApplicationV1) => void): void;
    deleteApplicationById(correlationId: string, application_id: string, callback: (err: any, application: ApplicationV1) => void): void;
}
