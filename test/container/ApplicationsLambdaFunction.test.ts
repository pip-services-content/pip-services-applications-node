let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor, MultiString } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { ConsoleLogger } from 'pip-services3-components-node';

import { ApplicationV1 } from '../../src/data/version1/ApplicationV1';
import { ApplicationsMemoryPersistence } from '../../src/persistence/ApplicationsMemoryPersistence';
import { ApplicationsController } from '../../src/logic/ApplicationsController';
import { ApplicationsLambdaFunction } from '../../src/container/ApplicationsLambdaFunction';

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
    name: new MultiString({en: 'App2'}),
    product: 'Product 1',
    copyrights: 'PipDevs 2018',
    min_ver: 0,
    max_ver: 9999
};

suite('ApplicationsLambdaFunction', ()=> {
    let lambda: ApplicationsLambdaFunction;

    suiteSetup((done) => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services:logger:console:default:1.0',
            'persistence.descriptor', 'pip-services-applications:persistence:memory:default:1.0',
            'controller.descriptor', 'pip-services-applications:controller:default:default:1.0'
        );

        lambda = new ApplicationsLambdaFunction();
        lambda.configure(config);
        lambda.open(null, done);
    });
    
    suiteTeardown((done) => {
        lambda.close(null, done);
    });
    
    test('CRUD Operations', (done) => {
        var application1, application2: ApplicationV1;

        async.series([
        // Create one application
            (callback) => {
                lambda.act(
                    {
                        role: 'applications',
                        cmd: 'create_application',
                        application: APPLICATION1
                    },
                    (err, application) => {
                        assert.isNull(err);

                        assert.isObject(application);
                        assert.equal(application.name, APPLICATION1.name);
                        assert.equal(application.product, APPLICATION1.product);
                        assert.equal(application.copyrights, APPLICATION1.copyrights);

                        application1 = application;

                        callback();
                    }
                );
            },
        // Create another application
            (callback) => {
                lambda.act(
                    {
                        role: 'applications',
                        cmd: 'create_application',
                        application: APPLICATION2
                    },
                    (err, application) => {
                        assert.isNull(err);

                        assert.isObject(application);
                        assert.equal(application.name, APPLICATION2.name);
                        assert.equal(application.product, APPLICATION2.product);
                        assert.equal(application.copyrights, APPLICATION2.copyrights);

                        application2 = application;

                        callback();
                    }
                );
            },
        // Get all applications
            (callback) => {
                lambda.act(
                    {
                        role: 'applications',
                        cmd: 'get_applications' 
                    },
                    (err, page) => {
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

                lambda.act(
                    {
                        role: 'applications',
                        cmd: 'update_application',
                        application: application1
                    },
                    (err, application) => {
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
                lambda.act(
                    {
                        role: 'applications',
                        cmd: 'delete_application_by_id',
                        application_id: application1.id
                    },
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete application
            (callback) => {
                lambda.act(
                    {
                        role: 'applications',
                        cmd: 'get_application_by_id',
                        application_id: application1.id
                    },
                    (err, application) => {
                        assert.isNull(err);

                        assert.isNull(application || null);

                        callback();
                    }
                );
            }
        ], done);
    });
});