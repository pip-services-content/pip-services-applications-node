import { ConfigParams } from 'pip-services-commons-node';
import { IConfigurable } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { IReferenceable } from 'pip-services-commons-node';
import { DependencyResolver } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { ICommandable } from 'pip-services-commons-node';
import { CommandSet } from 'pip-services-commons-node';
import { TagsProcessor } from 'pip-services-commons-node';

import { ApplicationV1 } from '../data/version1/ApplicationV1';
import { IApplicationsPersistence } from '../persistence/IApplicationsPersistence';
import { IApplicationsController } from './IApplicationsController';
import { ApplicationsCommandSet } from './ApplicationsCommandSet';

export class ApplicationsController implements  IConfigurable, IReferenceable, ICommandable, IApplicationsController {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'dependencies.persistence', 'pip-services-applications:persistence:*:*:1.0'
    );

    private _dependencyResolver: DependencyResolver = new DependencyResolver(ApplicationsController._defaultConfig);
    private _persistence: IApplicationsPersistence;
    private _commandSet: ApplicationsCommandSet;

    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired<IApplicationsPersistence>('persistence');
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new ApplicationsCommandSet(this);
        return this._commandSet;
    }
    
    public getApplications(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<ApplicationV1>) => void): void {
        this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    }

    public getApplicationById(correlationId: string, id: string, 
        callback: (err: any, application: ApplicationV1) => void): void {
        this._persistence.getOneById(correlationId, id, callback);        
    }

    public createApplication(correlationId: string, application: ApplicationV1, 
        callback: (err: any, application: ApplicationV1) => void): void {
        this._persistence.create(correlationId, application, callback);
    }

    public updateApplication(correlationId: string, application: ApplicationV1, 
        callback: (err: any, application: ApplicationV1) => void): void {
        this._persistence.update(correlationId, application, callback);
    }

    public deleteApplicationById(correlationId: string, id: string,
        callback: (err: any, application: ApplicationV1) => void): void {  
        this._persistence.deleteById(correlationId, id, callback);
    }

}
