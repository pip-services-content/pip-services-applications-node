"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_container_node_1 = require("pip-services3-container-node");
const ApplicationsServiceFactory_1 = require("../build/ApplicationsServiceFactory");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
const pip_services3_grpc_node_1 = require("pip-services3-grpc-node");
class ApplicationsProcess extends pip_services3_container_node_1.ProcessContainer {
    constructor() {
        super("applications", "Applications microservice");
        this._factories.add(new ApplicationsServiceFactory_1.ApplicationsServiceFactory);
        this._factories.add(new pip_services3_rpc_node_1.DefaultRpcFactory);
        this._factories.add(new pip_services3_grpc_node_1.DefaultGrpcFactory);
    }
}
exports.ApplicationsProcess = ApplicationsProcess;
//# sourceMappingURL=ApplicationsProcess.js.map