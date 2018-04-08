"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
class ApplicationsHttpServiceV1 extends pip_services_net_node_1.CommandableHttpService {
    constructor() {
        super('applications');
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-applications', 'controller', 'default', '*', '1.0'));
    }
}
exports.ApplicationsHttpServiceV1 = ApplicationsHttpServiceV1;
//# sourceMappingURL=ApplicationsHttpServiceV1.js.map