import { Descriptor } from 'pip-services3-commons-node';
import { CommandableGrpcService } from 'pip-services3-grpc-node';

export class ApplicationsCommandableGrpcServiceV1 extends CommandableGrpcService {
    public constructor() {
        super('v1/applications');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-applications', 'controller', 'default', '*', '*'));
    }
}