"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_mongodb_node_1 = require("pip-services3-mongodb-node");
class ApplicationsMongoDbPersistence extends pip_services3_mongodb_node_1.IdentifiableMongoDbPersistence {
    constructor() {
        super('applications');
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_node_1.FilterParams();
        let criteria = [];
        let search = filter.getAsNullableString('search');
        if (search != null) {
            let searchRegex = new RegExp(search, "i");
            let searchCriteria = [];
            searchCriteria.push({ id: { $regex: searchRegex } });
            searchCriteria.push({ product: { $regex: searchRegex } });
            searchCriteria.push({ copyrights: { $regex: searchRegex } });
            criteria.push({ $or: searchCriteria });
        }
        let id = filter.getAsNullableString('id');
        if (id != null)
            criteria.push({ _id: id });
        let product = filter.getAsNullableString('product');
        if (product != null)
            criteria.push({ product: product });
        let group = filter.getAsNullableString('group');
        if (group != null)
            criteria.push({ group: group });
        return criteria.length > 0 ? { $and: criteria } : null;
    }
    getPageByFilter(correlationId, filter, paging, callback) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }
}
exports.ApplicationsMongoDbPersistence = ApplicationsMongoDbPersistence;
//# sourceMappingURL=ApplicationsMongoDbPersistence.js.map