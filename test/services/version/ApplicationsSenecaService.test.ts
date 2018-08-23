let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-components-node';
import { SenecaInstance } from 'pip-services-seneca-node';

import { ApplicationV1 } from '../../../src/data/version1/ApplicationV1';
import { ApplicationsMemoryPersistence } from '../../../src/persistence/ApplicationsMemoryPersistence';
import { ApplicationsController } from '../../../src/logic/ApplicationsController';
import { ApplicationsSenecaServiceV1 } from '../../../src/services/version1/ApplicationsSenecaServiceV1';

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

suite('ApplicationsSenecaServiceV1', ()=> {        
    let seneca: any;
    let service: ApplicationsSenecaServiceV1;
    let persistence: ApplicationsMemoryPersistence;
    let controller: ApplicationsController;

    suiteSetup((done) => {
        persistence = new ApplicationsMemoryPersistence();
        controller = new ApplicationsController();

        service = new ApplicationsSenecaServiceV1();
        service.configure(ConfigParams.fromTuples(
            "connection.protocol", "none"
        ));

        let logger = new ConsoleLogger();
        let senecaAddon = new SenecaInstance();

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-seneca', 'seneca', 'instance', 'default', '1.0'), senecaAddon,
            new Descriptor('pip-services-applications', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-applications', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-applications', 'service', 'commandable-seneca', 'default', '1.0'), service
        );

        controller.setReferences(references);
        service.setReferences(references);

        seneca = senecaAddon.getInstance();

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });
    
    setup((done) => {
        persistence.clear(null, done);
    });
    
    test('CRUD Operations', (done) => {
        var application1, application2;

        async.series([
        // Create one application
            (callback) => {
                seneca.act(
                    {
                        role: 'applications',
                        cmd: 'create_application',
                        application: APPLICATION1
                    },
                    (err, application) => {
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
                seneca.act(
                    {
                        role: 'applications',
                        cmd: 'create_application',
                        application: APPLICATION2
                    },
                    (err, application) => {
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
                seneca.act(
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

                seneca.act(
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
                seneca.act(
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
                seneca.act(
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