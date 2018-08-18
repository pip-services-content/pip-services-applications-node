let _ = require('lodash');
let async = require('async');
let restify = require('restify');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';

import { ApplicationV1 } from '../../../src/data/version1/ApplicationV1';
import { ApplicationsMemoryPersistence } from '../../../src/persistence/ApplicationsMemoryPersistence';
import { ApplicationsController } from '../../../src/logic/ApplicationsController';
import { ApplicationsHttpServiceV1 } from '../../../src/services/version1/ApplicationsHttpServiceV1';

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

let APPLICATION1: ApplicationV1 = {
    id: '1',
    name: { en: 'App 1' },
    product: 'Product 1',
    copyrights: 'PipDevs 2018',
    min_ver: 0,
    max_ver: 9999
};
let APPLICATION2: ApplicationV1 = {
    id: '2',
    name: { en: 'App 2' },
    product: 'Product 1',
    copyrights: 'PipDevs 2018',
    min_ver: 0,
    max_ver: 9999
};

suite('ApplicationsHttpServiceV1', ()=> {    
    let service: ApplicationsHttpServiceV1;
    let rest: any;

    suiteSetup((done) => {
        let persistence = new ApplicationsMemoryPersistence();
        let controller = new ApplicationsController();

        service = new ApplicationsHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services-applications', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-applications', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-applications', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });

    setup(() => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
    });
    
    
    test('CRUD Operations', (done) => {
        let application1, application2;

        async.series([
        // Create one application
            (callback) => {
                rest.post('/v1/applications/create_application',
                    {
                        application: APPLICATION1
                    },
                    (err, req, res, application) => {
                        assert.isNull(err);

                        assert.isObject(application);
                        assert.equal(application.name.en, APPLICATION1.name.en);
                        assert.equal(application.product, APPLICATION1.product);
                        assert.equal(application.copyrights, APPLICATION1.copyrights);

                        application1 = application;

                        callback();
                    }
                );
            },
        // Create another application
            (callback) => {
                rest.post('/v1/applications/create_application', 
                    {
                        application: APPLICATION2
                    },
                    (err, req, res, application) => {
                        assert.isNull(err);

                        assert.isObject(application);
                        assert.equal(application.name.en, APPLICATION2.name.en);
                        assert.equal(application.product, APPLICATION2.product);
                        assert.equal(application.copyrights, APPLICATION2.copyrights);

                        application2 = application;

                        callback();
                    }
                );
            },
        // Get all applications
            (callback) => {
                rest.post('/v1/applications/get_applications',
                    {},
                    (err, req, res, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
        // Update the application
            (callback) => {
                application1.name.en = 'Updated Name 1';

                rest.post('/v1/applications/update_application',
                    { 
                        application: application1
                    },
                    (err, req, res, application) => {
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
                rest.post('/v1/applications/delete_application_by_id',
                    {
                        application_id: application1.id
                    },
                    (err, req, res, result) => {
                        assert.isNull(err);

                        //assert.isNull(result);

                        callback();
                    }
                );
            },
        // Try to get delete application
            (callback) => {
                rest.post('/v1/applications/get_application_by_id',
                    {
                        application_id: application1.id
                    },
                    (err, req, res, result) => {
                        assert.isNull(err);

                        //assert.isNull(result);

                        callback();
                    }
                );
            }
        ], done);
    });
});