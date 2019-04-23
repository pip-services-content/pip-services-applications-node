import { ConfigParams } from 'pip-services3-commons-node';

import { ApplicationsMemoryPersistence } from '../../src/persistence/ApplicationsMemoryPersistence';
import { ApplicationsPersistenceFixture } from './ApplicationsPersistenceFixture';

suite('ApplicationsMemoryPersistence', ()=> {
    let persistence: ApplicationsMemoryPersistence;
    let fixture: ApplicationsPersistenceFixture;
    
    setup((done) => {
        persistence = new ApplicationsMemoryPersistence();
        persistence.configure(new ConfigParams());
        
        fixture = new ApplicationsPersistenceFixture(persistence);
        
        persistence.open(null, done);
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