"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_aws_node_1 = require("pip-services-aws-node");
const ApplicationsServiceFactory_1 = require("../build/ApplicationsServiceFactory");
class ApplicationsLambdaFunction extends pip_services_aws_node_1.CommandableLambdaFunction {
    constructor() {
        super("applications", "Applications function");
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-applications', 'controller', 'default', '*', '*'));
        this._factories.add(new ApplicationsServiceFactory_1.ApplicationsServiceFactory());
    }
}
exports.ApplicationsLambdaFunction = ApplicationsLambdaFunction;
exports.handler = new ApplicationsLambdaFunction().getHandler();
//# sourceMappingURL=ApplicationsLambdaFunction.js.map