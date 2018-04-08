"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const ApplicationsCommandSet_1 = require("./ApplicationsCommandSet");
class ApplicationsController {
    constructor() {
        this._dependencyResolver = new pip_services_commons_node_2.DependencyResolver(ApplicationsController._defaultConfig);
    }
    configure(config) {
        this._dependencyResolver.configure(config);
    }
    setReferences(references) {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired('persistence');
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new ApplicationsCommandSet_1.ApplicationsCommandSet(this);
        return this._commandSet;
    }
    getApplications(correlationId, filter, paging, callback) {
        this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    }
    getApplicationById(correlationId, id, callback) {
        this._persistence.getOneById(correlationId, id, callback);
    }
    createApplication(correlationId, application, callback) {
        this._persistence.create(correlationId, application, callback);
    }
    updateApplication(correlationId, application, callback) {
        this._persistence.update(correlationId, application, callback);
    }
    deleteApplicationById(correlationId, id, callback) {
        this._persistence.deleteById(correlationId, id, callback);
    }
}
ApplicationsController._defaultConfig = pip_services_commons_node_1.ConfigParams.fromTuples('dependencies.persistence', 'pip-services-applications:persistence:*:*:1.0');
exports.ApplicationsController = ApplicationsController;
//# sourceMappingURL=ApplicationsController.js.map