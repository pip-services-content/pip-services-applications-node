import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';

import { ApplicationsServiceFactory } from '../build/ApplicationsServiceFactory';

export class ApplicationsProcess extends ProcessContainer {

    public constructor() {
        super("applications", "Applications microservice");
        this._factories.add(new ApplicationsServiceFactory);
    }


}
