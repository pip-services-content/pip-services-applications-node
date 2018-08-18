"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_components_node_1 = require("pip-services-components-node");
const pip_services_commons_node_1 = require("pip-services-commons-node");
const ApplicationsMongoDbPersistence_1 = require("../persistence/ApplicationsMongoDbPersistence");
const ApplicationsFilePersistence_1 = require("../persistence/ApplicationsFilePersistence");
const ApplicationsMemoryPersistence_1 = require("../persistence/ApplicationsMemoryPersistence");
const ApplicationsController_1 = require("../logic/ApplicationsController");
const ApplicationsHttpServiceV1_1 = require("../services/version1/ApplicationsHttpServiceV1");
const ApplicationsSenecaServiceV1_1 = require("../services/version1/ApplicationsSenecaServiceV1");
class ApplicationsServiceFactory extends pip_services_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(ApplicationsServiceFactory.MemoryPersistenceDescriptor, ApplicationsMemoryPersistence_1.ApplicationsMemoryPersistence);
        this.registerAsType(ApplicationsServiceFactory.FilePersistenceDescriptor, ApplicationsFilePersistence_1.ApplicationsFilePersistence);
        this.registerAsType(ApplicationsServiceFactory.MongoDbPersistenceDescriptor, ApplicationsMongoDbPersistence_1.ApplicationsMongoDbPersistence);
        this.registerAsType(ApplicationsServiceFactory.ControllerDescriptor, ApplicationsController_1.ApplicationsController);
        this.registerAsType(ApplicationsServiceFactory.SenecaServiceDescriptor, ApplicationsSenecaServiceV1_1.ApplicationsSenecaServiceV1);
        this.registerAsType(ApplicationsServiceFactory.HttpServiceDescriptor, ApplicationsHttpServiceV1_1.ApplicationsHttpServiceV1);
    }
}
ApplicationsServiceFactory.Descriptor = new pip_services_commons_node_1.Descriptor("pip-services-applications", "factory", "default", "default", "1.0");
ApplicationsServiceFactory.MemoryPersistenceDescriptor = new pip_services_commons_node_1.Descriptor("pip-services-applications", "persistence", "memory", "*", "1.0");
ApplicationsServiceFactory.FilePersistenceDescriptor = new pip_services_commons_node_1.Descriptor("pip-services-applications", "persistence", "file", "*", "1.0");
ApplicationsServiceFactory.MongoDbPersistenceDescriptor = new pip_services_commons_node_1.Descriptor("pip-services-applications", "persistence", "mongodb", "*", "1.0");
ApplicationsServiceFactory.ControllerDescriptor = new pip_services_commons_node_1.Descriptor("pip-services-applications", "controller", "default", "*", "1.0");
ApplicationsServiceFactory.SenecaServiceDescriptor = new pip_services_commons_node_1.Descriptor("pip-services-applications", "service", "seneca", "*", "1.0");
ApplicationsServiceFactory.HttpServiceDescriptor = new pip_services_commons_node_1.Descriptor("pip-services-applications", "service", "http", "*", "1.0");
exports.ApplicationsServiceFactory = ApplicationsServiceFactory;
//# sourceMappingURL=ApplicationsServiceFactory.js.map