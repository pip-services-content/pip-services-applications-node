let _ = require('lodash');

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { StringConverter } from 'pip-services3-commons-node';
import { BadRequestException } from 'pip-services3-commons-node';
import { IdentifiableCouchbasePersistence } from 'pip-services3-couchbase-node';

import { ApplicationV1 } from '../data/version1/ApplicationV1';
import { IApplicationsPersistence } from './IApplicationsPersistence';

export class ApplicationsCouchbasePersistence 
    extends IdentifiableCouchbasePersistence<ApplicationV1, string> 
    implements IApplicationsPersistence {

    constructor() {
        super('applications');
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();
        let search = filter.getAsNullableString('search');
        let id = filter.getAsNullableString('id');
        let product = filter.getAsNullableString('product');
        let group = filter.getAsNullableString('group');
        
        let filters: string[] = [];
        if (id != null)
            filters.push("id='" + id + "'");
        if (product != null)
            filters.push("product='" + product + "'");
        if (group != null)
            filters.push("group='" + group + "'");
        if (search != null)
            filters.push("(id LIKE '%" + search + "%' OR product LIKE '%" + search + "%' OR copyrights LIKE '%" + search + "%')");

        return filters.length > 0 ? filters.join(" AND ") : null;
    }

    public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<ApplicationV1>) => void): void {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }

}
