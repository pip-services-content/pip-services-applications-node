import { ConfigParams } from 'pip-services-commons-node';

import { ApplicationsFilePersistence } from '../../src/persistence/ApplicationsFilePersistence';
import { ApplicationsPersistenceFixture } from './ApplicationsPersistenceFixture';

suite('ApplicationsFilePersistence', ()=> {
    let persistence: ApplicationsFilePersistence;
    let fixture: ApplicationsPersistenceFixture;
    
    setup((done) => {
        persistence = new ApplicationsFilePersistence('./data/applications.test.json');

        fixture = new ApplicationsPersistenceFixture(persistence);

        persistence.open(null, (err) => {
            persistence.clear(null, done);
        });
    });
    
    teardown((done) => {
        persistence.close(null, done);
    });
        
    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

    test('Get with Filters', (done) => {
        fixture.testGetWithFilter(done);
    });

});