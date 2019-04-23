import { IReferences } from 'pip-services3-commons-node';
import { ProcessContainer } from 'pip-services3-container-node';

import { ApplicationsServiceFactory } from '../build/ApplicationsServiceFactory';
import { DefaultRpcFactory } from 'pip-services3-rpc-node';

export class ApplicationsProcess extends ProcessContainer {

    public constructor() {
        super("applications", "Applications microservice");
        this._factories.add(new ApplicationsServiceFactory);
        this._factories.add(new DefaultRpcFactory);
    }

}
