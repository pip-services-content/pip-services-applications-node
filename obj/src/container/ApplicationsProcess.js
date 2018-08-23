"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const ApplicationsServiceFactory_1 = require("../build/ApplicationsServiceFactory");
const pip_services_rpc_node_1 = require("pip-services-rpc-node");
class ApplicationsProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super("applications", "Applications microservice");
        this._factories.add(new ApplicationsServiceFactory_1.ApplicationsServiceFactory);
        this._factories.add(new pip_services_rpc_node_1.DefaultRpcFactory);
    }
}
exports.ApplicationsProcess = ApplicationsProcess;
//# sourceMappingURL=ApplicationsProcess.js.map