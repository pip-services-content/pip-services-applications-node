"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let services = require('../../../../src/protos/applications_v1_grpc_pb');
let messages = require('../../../../src/protos/applications_v1_pb');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_grpc_node_1 = require("pip-services3-grpc-node");
const ApplicationsGrpcConverterV1_1 = require("./ApplicationsGrpcConverterV1");
class ApplicationsGrpcServiceV1 extends pip_services3_grpc_node_1.GrpcService {
    constructor() {
        super(services.ApplicationsService);
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor("pip-services-applications", "controller", "default", "*", "*"));
    }
    setReferences(references) {
        super.setReferences(references);
        this._controller = this._dependencyResolver.getOneRequired('controller');
    }
    getApplications(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let filter = new pip_services3_commons_node_2.FilterParams();
        ApplicationsGrpcConverterV1_1.ApplicationsGrpcConverterV1.setMap(filter, call.request.getFilterMap());
        let paging = ApplicationsGrpcConverterV1_1.ApplicationsGrpcConverterV1.toPagingParams(call.request.getPaging());
        this._controller.getApplications(correlationId, filter, paging, (err, result) => {
            let error = ApplicationsGrpcConverterV1_1.ApplicationsGrpcConverterV1.fromError(err);
            let page = err == null ? ApplicationsGrpcConverterV1_1.ApplicationsGrpcConverterV1.fromApplicationPage(result) : null;
            let response = new messages.ApplicationPageReply();
            response.setError(error);
            response.setPage(page);
            callback(err, response);
        });
    }
    getApplicationById(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let applicationId = call.request.getApplicationId();
        this._controller.getApplicationById(correlationId, applicationId, (err, result) => {
            let error = ApplicationsGrpcConverterV1_1.ApplicationsGrpcConverterV1.fromError(err);
            let application = err == null ? ApplicationsGrpcConverterV1_1.ApplicationsGrpcConverterV1.fromApplication(result) : null;
            let response = new messages.ApplicationObjectReply();
            response.setError(error);
            response.setApplication(application);
            callback(err, response);
        });
    }
    createApplication(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let application = ApplicationsGrpcConverterV1_1.ApplicationsGrpcConverterV1.toApplication(call.request.getApplication());
        this._controller.createApplication(correlationId, application, (err, result) => {
            let error = ApplicationsGrpcConverterV1_1.ApplicationsGrpcConverterV1.fromError(err);
            let application = err == null ? ApplicationsGrpcConverterV1_1.ApplicationsGrpcConverterV1.fromApplication(result) : null;
            let response = new messages.ApplicationObjectReply();
            response.setError(error);
            if (result)
                response.setApplication(application);
            callback(err, response);
        });
    }
    updateApplication(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let application = ApplicationsGrpcConverterV1_1.ApplicationsGrpcConverterV1.toApplication(call.request.getApplication());
        this._controller.updateApplication(correlationId, application, (err, result) => {
            let error = ApplicationsGrpcConverterV1_1.ApplicationsGrpcConverterV1.fromError(err);
            let application = err == null ? ApplicationsGrpcConverterV1_1.ApplicationsGrpcConverterV1.fromApplication(result) : null;
            let response = new messages.ApplicationObjectReply();
            response.setError(error);
            if (result)
                response.setApplication(application);
            callback(err, response);
        });
    }
    deleteApplicationById(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let applicationId = call.request.getApplicationId();
        this._controller.deleteApplicationById(correlationId, applicationId, (err, result) => {
            let error = ApplicationsGrpcConverterV1_1.ApplicationsGrpcConverterV1.fromError(err);
            let application = err == null ? ApplicationsGrpcConverterV1_1.ApplicationsGrpcConverterV1.fromApplication(result) : null;
            let response = new messages.ApplicationObjectReply();
            response.setError(error);
            if (result)
                response.setApplication(application);
            callback(err, response);
        });
    }
    register() {
        this.registerMethod('get_applications', null, this.getApplications);
        this.registerMethod('get_application_by_id', null, this.getApplicationById);
        this.registerMethod('create_application', null, this.createApplication);
        this.registerMethod('update_application', null, this.updateApplication);
        this.registerMethod('delete_application_by_id', null, this.deleteApplicationById);
    }
}
exports.ApplicationsGrpcServiceV1 = ApplicationsGrpcServiceV1;
//# sourceMappingURL=ApplicationsGrpcServiceV1.js.map