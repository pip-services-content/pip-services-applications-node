"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const pip_services_commons_node_4 = require("pip-services-commons-node");
const pip_services_commons_node_5 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
const pip_services_net_node_2 = require("pip-services-net-node");
const ApplicationsMemoryPersistence_1 = require("../persistence/ApplicationsMemoryPersistence");
const ApplicationsFilePersistence_1 = require("../persistence/ApplicationsFilePersistence");
const ApplicationsMongoDbPersistence_1 = require("../persistence/ApplicationsMongoDbPersistence");
const ApplicationsController_1 = require("../logic/ApplicationsController");
const ApplicationsSenecaServiceV1_1 = require("../services/version1/ApplicationsSenecaServiceV1");
class ApplicationsSenecaPlugin extends pip_services_net_node_1.SenecaPlugin {
    constructor(seneca, options) {
        super('pip-services-applications', seneca, ApplicationsSenecaPlugin.createReferences(seneca, options));
    }
    static createReferences(seneca, options) {
        options = options || {};
        let logger = new pip_services_commons_node_4.ConsoleLogger();
        let loggerOptions = options.logger || {};
        logger.configure(pip_services_commons_node_3.ConfigParams.fromValue(loggerOptions));
        let controller = new ApplicationsController_1.ApplicationsController();
        let persistence;
        let persistenceOptions = options.persistence || {};
        let persistenceType = persistenceOptions.type || 'memory';
        if (persistenceType == 'mongodb')
            persistence = new ApplicationsMongoDbPersistence_1.ApplicationsMongoDbPersistence();
        else if (persistenceType == 'file')
            persistence = new ApplicationsFilePersistence_1.ApplicationsFilePersistence();
        else if (persistenceType == 'memory')
            persistence = new ApplicationsMemoryPersistence_1.ApplicationsMemoryPersistence();
        else
            throw new pip_services_commons_node_5.ConfigException(null, 'WRONG_PERSISTENCE_TYPE', 'Unrecognized persistence type: ' + persistenceType);
        persistence.configure(pip_services_commons_node_3.ConfigParams.fromValue(persistenceOptions));
        let senecaInstance = new pip_services_net_node_2.SenecaInstance(seneca);
        let service = new ApplicationsSenecaServiceV1_1.ApplicationsSenecaServiceV1();
        let serviceOptions = options.service || {};
        service.configure(pip_services_commons_node_3.ConfigParams.fromValue(serviceOptions));
        return pip_services_commons_node_1.References.fromTuples(new pip_services_commons_node_2.Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger, new pip_services_commons_node_2.Descriptor('pip-services-net', 'seneca', 'instance', 'default', '1.0'), senecaInstance, new pip_services_commons_node_2.Descriptor('pip-services-applications', 'persistence', persistenceType, 'default', '1.0'), persistence, new pip_services_commons_node_2.Descriptor('pip-services-applications', 'controller', 'default', 'default', '1.0'), controller, new pip_services_commons_node_2.Descriptor('pip-services-applications', 'service', 'seneca', 'default', '1.0'), service);
    }
}
exports.ApplicationsSenecaPlugin = ApplicationsSenecaPlugin;
module.exports = function (options) {
    let seneca = this;
    let plugin = new ApplicationsSenecaPlugin(seneca, options);
    return { name: plugin.name };
};
//# sourceMappingURL=ApplicationsSenecaPlugin.js.map