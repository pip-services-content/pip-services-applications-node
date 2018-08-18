"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const ApplicationsServiceFactory_1 = require("../build/ApplicationsServiceFactory");
class ApplicationsProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super("applications", "Applications microservice");
        this._factories.add(new ApplicationsServiceFactory_1.ApplicationsServiceFactory);
    }
}
exports.ApplicationsProcess = ApplicationsProcess;
//# sourceMappingURL=ApplicationsProcess.js.map