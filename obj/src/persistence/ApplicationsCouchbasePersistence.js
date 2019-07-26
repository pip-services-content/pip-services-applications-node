"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_couchbase_node_1 = require("pip-services3-couchbase-node");
class ApplicationsCouchbasePersistence extends pip_services3_couchbase_node_1.IdentifiableCouchbasePersistence {
    constructor() {
        super('content', 'applications');
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_node_1.FilterParams();
        let search = filter.getAsNullableString('search');
        let id = filter.getAsNullableString('id');
        let product = filter.getAsNullableString('product');
        let group = filter.getAsNullableString('group');
        let filters = [];
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
    getPageByFilter(correlationId, filter, paging, callback) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }
}
exports.ApplicationsCouchbasePersistence = ApplicationsCouchbasePersistence;
//# sourceMappingURL=ApplicationsCouchbasePersistence.js.map