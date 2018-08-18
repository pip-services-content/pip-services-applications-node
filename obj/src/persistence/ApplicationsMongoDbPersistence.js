"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_mongodb_node_1 = require("pip-services-mongodb-node");
const ApplicationsMongoDbSchema_1 = require("./ApplicationsMongoDbSchema");
class ApplicationsMongoDbPersistence extends pip_services_mongodb_node_1.IdentifiableMongoDbPersistence {
    constructor() {
        super('applications', ApplicationsMongoDbSchema_1.ApplicationsMongoDbSchema());
    }
    composeFilter(filter) {
        filter = filter || new pip_services_commons_node_1.FilterParams();
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
        return criteria.length > 0 ? { $and: criteria } : null;
    }
    getPageByFilter(correlationId, filter, paging, callback) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }
}
exports.ApplicationsMongoDbPersistence = ApplicationsMongoDbPersistence;
//# sourceMappingURL=ApplicationsMongoDbPersistence.js.map