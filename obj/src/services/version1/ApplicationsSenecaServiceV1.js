"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_seneca_node_1 = require("pip-services-seneca-node");
class ApplicationsSenecaServiceV1 extends pip_services_seneca_node_1.CommandableSenecaService {
    constructor() {
        super('applications');
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-applications', 'controller', 'default', '*', '1.0'));
    }
}
exports.ApplicationsSenecaServiceV1 = ApplicationsSenecaServiceV1;
//# sourceMappingURL=ApplicationsSenecaServiceV1.js.map