let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';

import { ApplicationV1 } from '../../src/data/version1/ApplicationV1';

import { IApplicationsPersistence } from '../../src/persistence/IApplicationsPersistence';

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
let APPLICATION3: ApplicationV1 = {
    id: '3',
    name: { en: 'App 3' },
    product: 'Product 2',
    copyrights: 'PipDevs 2008',
    min_ver: 0,
    max_ver: 9999
};

export class ApplicationsPersistenceFixture {
    private _persistence: IApplicationsPersistence;
    
    constructor(persistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }

    private testCreateApplications(done) {
        async.series([
        // Create one application
            (callback) => {
                this._persistence.create(
                    null,
                    APPLICATION1,
                    (err, application) => {
                        assert.isNull(err);

                        assert.isObject(application);
                        assert.equal(application.name.en, APPLICATION1.name.en);
                        assert.equal(application.product, APPLICATION1.product);
                        assert.equal(application.copyrights, APPLICATION1.copyrights);

                        callback();
                    }
                );
            },
        // Create another application
            (callback) => {
                this._persistence.create(
                    null,
                    APPLICATION2,
                    (err, application) => {
                        assert.isNull(err);

                        assert.isObject(application);
                        assert.equal(application.name.en, APPLICATION2.name.en);
                        assert.equal(application.product, APPLICATION2.product);
                        assert.equal(application.copyrights, APPLICATION2.copyrights);

                        callback();
                    }
                );
            },
        // Create yet another application
            (callback) => {
                this._persistence.create(
                    null,
                    APPLICATION3,
                    (err, application) => {
                        assert.isNull(err);

                        assert.isObject(application);
                        assert.equal(application.name.en, APPLICATION3.name.en);
                        assert.equal(application.product, APPLICATION3.product);
                        assert.equal(application.copyrights, APPLICATION3.copyrights);

                        callback();
                    }
                );
            }
        ], done);
    }
                
    testCrudOperations(done) {
        let application1: ApplicationV1;

        async.series([
        // Create items
            (callback) => {
                this.testCreateApplications(callback);
            },
        // Get all applications
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    new FilterParams(),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 3);

                        application1 = page.data[0];

                        callback();
                    }
                );
            },
        // Update the application
            (callback) => {
                application1.name.en = 'Updated Name 1';

                this._persistence.update(
                    null,
                    application1,
                    (err, application) => {
                        assert.isNull(err);

                        assert.isObject(application);
                        assert.equal(application.name.en, 'Updated Name 1');
                        assert.equal(application.id, application1.id);

                        callback();
                    }
                );
            },
        // Delete application
            (callback) => {
                this._persistence.deleteById(
                    null,
                    application1.id,
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete application
            (callback) => {
                this._persistence.getOneById(
                    null,
                    application1.id,
                    (err, application) => {
                        assert.isNull(err);

                        assert.isNull(application || null);

                        callback();
                    }
                );
            }
        ], done);
    }

    testGetWithFilter(done) {
        async.series([
        // Create applications
            (callback) => {
                this.testCreateApplications(callback);
            },
        // Get applications filtered by product
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        product: 'Product 1'
                    }),
                    new PagingParams(),
                    (err, applications) => {
                        assert.isNull(err);

                        assert.isObject(applications);
                        assert.lengthOf(applications.data, 2);

                        callback();
                    }
                );
            },
        // Get applications filtered by search
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        search: '1'
                    }),
                    new PagingParams(),
                    (err, applications) => {
                        assert.isNull(err);

                        assert.isObject(applications);
                        assert.lengthOf(applications.data, 2);

                        callback();
                    }
                );
            }
        ], done);
    }

}
