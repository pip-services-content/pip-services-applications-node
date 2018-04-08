import { Descriptor } from 'pip-services-commons-node';
import { CommandableSenecaService } from 'pip-services-net-node';

export class ApplicationsSenecaServiceV1 extends CommandableSenecaService {
    public constructor() {
        super('applications');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-applications', 'controller', 'default', '*', '1.0'));
    }
}