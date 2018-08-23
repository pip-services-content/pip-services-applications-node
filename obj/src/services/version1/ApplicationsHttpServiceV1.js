"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_rpc_node_1 = require("pip-services-rpc-node");
class ApplicationsHttpServiceV1 extends pip_services_rpc_node_1.CommandableHttpService {
    constructor() {
        super('v1/applications');
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-applications', 'controller', 'default', '*', '1.0'));
    }
}
exports.ApplicationsHttpServiceV1 = ApplicationsHttpServiceV1;
//# sourceMappingURL=ApplicationsHttpServiceV1.js.map