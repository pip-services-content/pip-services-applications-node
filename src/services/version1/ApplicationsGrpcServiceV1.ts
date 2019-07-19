let _ = require('lodash');
let services = require('../../../../src/protos/applications_v1_grpc_pb');
let messages = require('../../../../src/protos/applications_v1_pb');

import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { ObjectSchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';
import { FilterParamsSchema } from 'pip-services3-commons-node';
import { PagingParamsSchema } from 'pip-services3-commons-node';
import { GrpcService } from 'pip-services3-grpc-node';

import { ApplicationV1 } from '../../data/version1/ApplicationV1';
import { ApplicationV1Schema } from '../../data/version1/ApplicationV1Schema';
import { IApplicationsController } from '../../logic/IApplicationsController';
import { ApplicationsGrpcConverterV1 } from './ApplicationsGrpcConverterV1';

export class ApplicationsGrpcServiceV1 extends GrpcService {
    private _controller: IApplicationsController;
	
    public constructor() {
        super(services.ApplicationsService);
        this._dependencyResolver.put('controller', new Descriptor("pip-services-applications", "controller", "default", "*", "*"));
    }

	public setReferences(references: IReferences): void {
		super.setReferences(references);
        this._controller = this._dependencyResolver.getOneRequired<IApplicationsController>('controller');
    }
    
    private getApplications(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let filter = new FilterParams();
        ApplicationsGrpcConverterV1.setMap(filter, call.request.getFilterMap());
        let paging = ApplicationsGrpcConverterV1.toPagingParams(call.request.getPaging());

        this._controller.getApplications(
            correlationId,
            filter,
            paging,
            (err, result) => {
                let error = ApplicationsGrpcConverterV1.fromError(err);
                let page = err == null ? ApplicationsGrpcConverterV1.fromApplicationPage(result) : null;

                let response = new messages.ApplicationPageReply();
                response.setError(error);
                response.setPage(page);

                callback(err, response);
            }
        );
    }

    private getApplicationById(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let applicationId = call.request.getApplicationId();

        this._controller.getApplicationById(
            correlationId,
            applicationId,
            (err, result) => {
                let error = ApplicationsGrpcConverterV1.fromError(err);
                let application = err == null ? ApplicationsGrpcConverterV1.fromApplication(result) : null;

                let response = new messages.ApplicationObjectReply();
                response.setError(error);
                response.setApplication(application);

                callback(err, response);
            }
        );
    }

    private createApplication(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let application = ApplicationsGrpcConverterV1.toApplication(call.request.getApplication());

        this._controller.createApplication(
            correlationId,
            application,
            (err, result) => {
                let error = ApplicationsGrpcConverterV1.fromError(err);
                let application = err == null ? ApplicationsGrpcConverterV1.fromApplication(result) : null;

                let response = new messages.ApplicationObjectReply();
                response.setError(error);
                if (result)
                    response.setApplication(application);

                callback(err, response);
            }
        );
    }

    private updateApplication(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let application = ApplicationsGrpcConverterV1.toApplication(call.request.getApplication());

        this._controller.updateApplication(
            correlationId,
            application,
            (err, result) => {
                let error = ApplicationsGrpcConverterV1.fromError(err);
                let application = err == null ? ApplicationsGrpcConverterV1.fromApplication(result) : null;

                let response = new messages.ApplicationObjectReply();
                response.setError(error);
                if (result)
                    response.setApplication(application);

                callback(err, response);
            }
        );
    }

    private deleteApplicationById(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let applicationId = call.request.getApplicationId();

        this._controller.deleteApplicationById(
            correlationId,
            applicationId,
            (err, result) => {
                let error = ApplicationsGrpcConverterV1.fromError(err);
                let application = err == null ? ApplicationsGrpcConverterV1.fromApplication(result) : null;

                let response = new messages.ApplicationObjectReply();
                response.setError(error);
                if (result)
                    response.setApplication(application);

                callback(err, response);
            }
        );
    }    
        
    public register() {
        this.registerMethod(
            'get_applications', 
            null,
            this.getApplications
        );

        this.registerMethod(
            'get_application_by_id', 
            null,
            this.getApplicationById
        );

        this.registerMethod(
            'create_application', 
            null,
            this.createApplication
        );

        this.registerMethod(
            'update_application', 
            null,
            this.updateApplication
        );

        this.registerMethod(
            'delete_application_by_id',
            null, 
            this.deleteApplicationById
        );
    }
}
