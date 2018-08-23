let _ = require('lodash');

import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { IdentifiableMemoryPersistence } from 'pip-services-data-node';
import { TagsProcessor } from 'pip-services-commons-node';

import { ApplicationV1 } from '../data/version1/ApplicationV1';
import { IApplicationsPersistence } from './IApplicationsPersistence';

export class ApplicationsMemoryPersistence 
    extends IdentifiableMemoryPersistence<ApplicationV1, string> 
    implements IApplicationsPersistence {

    constructor() {
        super();
    }

    private matchString(value: string, search: string): boolean {
        if (value == null && search == null)
            return true;
        if (value == null || search == null)
            return false;
        return value.toLowerCase().indexOf(search) >= 0;
    }

    private matchSearch(item: ApplicationV1, search: string): boolean {
        search = search.toLowerCase();
        if (this.matchString(item.id, search))
            return true;
        if (this.matchString(item.product, search))
            return true;
        if (this.matchString(item.copyrights, search))
            return true;
        return false;
    }
    
    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();
        
        let search = filter.getAsNullableString('search');
        let id = filter.getAsNullableString('id');
        let product = filter.getAsNullableString('product');
        let group = filter.getAsNullableString('group');
                
        return (item) => {
            if (search && !this.matchSearch(item, search)) 
                return false;
            if (id && item.id != id) 
                return false;
            if (product && item.product != product) 
                return false;
            if (group && item.group != group) 
                return false;
            return true; 
        };
    }

    public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<ApplicationV1>) => void): void {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }

}
