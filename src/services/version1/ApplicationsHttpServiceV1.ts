import { Descriptor } from 'pip-services-commons-node';
import { CommandableHttpService } from 'pip-services-rpc-node';

export class ApplicationsHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/applications');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-applications', 'controller', 'default', '*', '1.0'));
    }
}