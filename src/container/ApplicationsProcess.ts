import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';
import { DefaultNetFactory } from 'pip-services-net-node';
import { DefaultOssFactory } from 'pip-services-oss-node';

import { ApplicationsServiceFactory } from '../build/ApplicationsServiceFactory';

export class ApplicationsProcess extends ProcessContainer {

    public constructor() {
        super("applications", "Applications microservice");
        this._factories.add(new ApplicationsServiceFactory);
        this._factories.add(new DefaultNetFactory);
        this._factories.add(new DefaultOssFactory);
    }

}
