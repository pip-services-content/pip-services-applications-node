import { Factory } from 'pip-services3-components-node';
import { Descriptor } from 'pip-services3-commons-node';

import { ApplicationsCouchbasePersistence } from '../persistence/ApplicationsCouchbasePersistence';
import { ApplicationsMongoDbPersistence } from '../persistence/ApplicationsMongoDbPersistence';
import { ApplicationsFilePersistence } from '../persistence/ApplicationsFilePersistence';
import { ApplicationsMemoryPersistence } from '../persistence/ApplicationsMemoryPersistence';
import { ApplicationsController } from '../logic/ApplicationsController';
import { ApplicationsHttpServiceV1 } from '../services/version1/ApplicationsHttpServiceV1';
import { ApplicationsCommandableGrpcServiceV1 } from '../services/version1/ApplicationsCommandableGrpcServiceV1';
import { ApplicationsGrpcServiceV1 } from '../services/version1/ApplicationsGrpcServiceV1';

export class ApplicationsServiceFactory extends Factory {
	public static Descriptor = new Descriptor("pip-services-applications", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("pip-services-applications", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("pip-services-applications", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("pip-services-applications", "persistence", "mongodb", "*", "1.0");
	public static CouchbasePersistenceDescriptor = new Descriptor("pip-services-applications", "persistence", "couchbase", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("pip-services-applications", "controller", "default", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("pip-services-applications", "service", "http", "*", "1.0");
	public static CommandableGrpcServiceDescriptor = new Descriptor("pip-services-applications", "service", "commandable-grpc", "*", "1.0");
	public static GrpcServiceDescriptor = new Descriptor("pip-services-applications", "service", "grpc", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(ApplicationsServiceFactory.MemoryPersistenceDescriptor, ApplicationsMemoryPersistence);
		this.registerAsType(ApplicationsServiceFactory.FilePersistenceDescriptor, ApplicationsFilePersistence);
		this.registerAsType(ApplicationsServiceFactory.MongoDbPersistenceDescriptor, ApplicationsMongoDbPersistence);
		this.registerAsType(ApplicationsServiceFactory.CouchbasePersistenceDescriptor, ApplicationsCouchbasePersistence);
		this.registerAsType(ApplicationsServiceFactory.ControllerDescriptor, ApplicationsController);
		this.registerAsType(ApplicationsServiceFactory.HttpServiceDescriptor, ApplicationsHttpServiceV1);
		this.registerAsType(ApplicationsServiceFactory.CommandableGrpcServiceDescriptor, ApplicationsCommandableGrpcServiceV1);
		this.registerAsType(ApplicationsServiceFactory.GrpcServiceDescriptor, ApplicationsGrpcServiceV1);
	}
	
}
