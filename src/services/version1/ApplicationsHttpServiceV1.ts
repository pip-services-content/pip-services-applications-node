import { Descriptor } from 'pip-services-commons-node';
import { CommandableHttpService } from 'pip-services-net-node';

export class ApplicationsHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('applications');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-applications', 'controller', 'default', '*', '1.0'));
    }
}