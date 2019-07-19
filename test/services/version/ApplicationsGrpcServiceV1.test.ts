let assert = require('chai').assert;
let grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
let async = require('async');

let services = require('../../../../src/protos/applications_v1_grpc_pb');
let messages = require('../../../../src/protos/applications_v1_pb');

import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { MultiString } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';

import { ApplicationV1 } from '../../../src/data/version1/ApplicationV1';
import { ApplicationsMemoryPersistence } from '../../../src/persistence/ApplicationsMemoryPersistence';
import { ApplicationsController } from '../../../src/logic/ApplicationsController';
import { ApplicationsGrpcServiceV1 } from '../../../src/services/version1/ApplicationsGrpcServiceV1';

var grpcConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

let APPLICATION1: ApplicationV1 = {
    id: '1',
    name: new MultiString({en: 'App1'}),
    product: 'Product 1',
    copyrights: 'PipDevs 2018',
    min_ver: 0,
    max_ver: 9999
};
let APPLICATION2: ApplicationV1 = {
    id: '2',
    name: new MultiString({en: 'App1'}),
    product: 'Product 1',
    copyrights: 'PipDevs 2018',
    min_ver: 0,
    max_ver: 9999
};

suite('ApplicationsGrpcServiceV1', ()=> {
    let service: ApplicationsGrpcServiceV1;

    let client: any;

    suiteSetup((done) => {
        let persistence = new ApplicationsMemoryPersistence();
        let controller = new ApplicationsController();

        service = new ApplicationsGrpcServiceV1();
        service.configure(grpcConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services-applications', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-applications', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-applications', 'service', 'grpc', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });

    setup(() => {
        let packageDefinition = protoLoader.loadSync(
            __dirname + "../../../../../src/protos/applications_v1.proto",
            {
                keepCase: true,
                longs: Number,
                enums: Number,
                defaults: true,
                oneofs: true
            }
        );
        let clientProto = grpc.loadPackageDefinition(packageDefinition).applications_v1.Applications;

        client = new clientProto('localhost:3000', grpc.credentials.createInsecure());
    });

    test('CRUD Operations', (done) => {
        let application1, application2;

        async.series([
        // Create one application
            (callback) => {
                client.create_application(
                    { 
                        application: APPLICATION1 
                    },
                    (err, response) => {
                        err = err || response.error;
                        let application = response ? response.application : null;

                        assert.isNull(err);
                        
                        assert.isObject(application);
                        assert.equal(application.name.en, APPLICATION1.name.get('en'));
                        assert.equal(application.product, APPLICATION1.product);
                        assert.equal(application.copyrights, APPLICATION1.copyrights);

                        application1 = application;

                        callback();
                    }
                );
            },
        // Create another application
            (callback) => {
                client.create_application(
                    { 
                        application: APPLICATION2 
                    },
                    (err, response) => {
                        err = err || response.error;
                        let application = response ? response.application : null;

                        assert.isNull(err);
                        
                        assert.isObject(application);
                        assert.equal(application.name.en, APPLICATION2.name.get('en'));
                        assert.equal(application.product, APPLICATION2.product);
                        assert.equal(application.copyrights, APPLICATION2.copyrights);

                        application2 = application;

                        callback();
                    }
                );
            },
    // Get all applications
            (callback) => {
                client.get_applications(
                    {
                        filter: {}
                    },
                    (err, response) => {
                        err = err || response.error;
                        let applications = response ? response.page : null;

                        assert.isNull(err);
                        
                        assert.isObject(applications);
                        assert.lengthOf(applications.data, 2);

                        callback();
                    }
                );
            },
        // Update the application
            (callback) => {
                application1.name.en = 'Updated Name 1';

                client.update_application(
                    { 
                        application: application1 
                    },
                    (err, response) => {
                        err = err || response.error;
                        let application = response ? response.application : null;

                        assert.isNull(err);
                        
                        assert.isObject(application);
                        assert.equal(application.name.en, 'Updated Name 1');
                        assert.equal(application.id, APPLICATION1.id);

                        application1 = application;

                        callback();
                    }
                );
            },
        // Delete application
            (callback) => {
                client.delete_application_by_id(
                    { 
                        application_id: application1.id 
                    },
                    (err, response) => {
                        err = err || response.error;
                        let application = response ? response.application : null;

                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete application
            (callback) => {
                client.get_application_by_id(
                    { 
                        application_id: application1.id 
                    },
                    (err, response) => {
                        err = err || response.error;
                        let application = response ? response.application : null;

                        assert.isNull(err);
                        
                        //assert.isObject(application);

                        callback();
                    }
                );
            }
        ], done);
    });

});
