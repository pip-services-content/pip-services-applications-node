"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const pip_services_net_node_1 = require("pip-services-net-node");
const pip_services_oss_node_1 = require("pip-services-oss-node");
const ApplicationsServiceFactory_1 = require("../build/ApplicationsServiceFactory");
class ApplicationsProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super("applications", "Applications microservice");
        this._factories.add(new ApplicationsServiceFactory_1.ApplicationsServiceFactory);
        this._factories.add(new pip_services_net_node_1.DefaultNetFactory);
        this._factories.add(new pip_services_oss_node_1.DefaultOssFactory);
    }
}
exports.ApplicationsProcess = ApplicationsProcess;
//# sourceMappingURL=ApplicationsProcess.js.map