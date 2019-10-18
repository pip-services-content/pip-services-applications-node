import { IReferences } from 'pip-services3-commons-node';
import { GrpcService } from 'pip-services3-grpc-node';
export declare class ApplicationsGrpcServiceV1 extends GrpcService {
    private _controller;
    constructor();
    setReferences(references: IReferences): void;
    private getApplications;
    private getApplicationById;
    private createApplication;
    private updateApplication;
    private deleteApplicationById;
    register(): void;
}
