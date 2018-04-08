"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
class ApplicationV1Schema extends pip_services_commons_node_1.ObjectSchema {
    constructor() {
        super();
        this.withOptionalProperty('id', pip_services_commons_node_2.TypeCode.String);
        this.withRequiredProperty('name', pip_services_commons_node_2.TypeCode.String);
        this.withOptionalProperty('description', pip_services_commons_node_2.TypeCode.String);
        this.withRequiredProperty('product', pip_services_commons_node_2.TypeCode.String);
        this.withOptionalProperty('copyrights', pip_services_commons_node_2.TypeCode.String);
        this.withOptionalProperty('url', pip_services_commons_node_2.TypeCode.String);
        this.withOptionalProperty('min_ver', pip_services_commons_node_2.TypeCode.Integer);
        this.withOptionalProperty('max_ver', pip_services_commons_node_2.TypeCode.Integer);
    }
}
exports.ApplicationV1Schema = ApplicationV1Schema;
//# sourceMappingURL=ApplicationV1Schema.js.map