import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';

import { ApplicationsServiceFactory } from '../build/ApplicationsServiceFactory';
import { DefaultRpcFactory } from 'pip-services-rpc-node';

export class ApplicationsProcess extends ProcessContainer {

    public constructor() {
        super("applications", "Applications microservice");
        this._factories.add(new ApplicationsServiceFactory);
        this._factories.add(new DefaultRpcFactory);
    }

}
