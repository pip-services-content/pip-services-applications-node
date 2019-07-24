import { IReferences } from 'pip-services3-commons-node';
import { GrpcService } from 'pip-services3-grpc-node';
export declare class ApplicationsGrpcServiceV1 extends GrpcService {
    private _controller;
    constructor();
    setReferences(references: IReferences): void;
    private getApplications(call, callback);
    private getApplicationById(call, callback);
    private createApplication(call, callback);
    private updateApplication(call, callback);
    private deleteApplicationById(call, callback);
    register(): void;
}
