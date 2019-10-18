"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const pip_services3_commons_node_4 = require("pip-services3-commons-node");
const pip_services3_commons_node_5 = require("pip-services3-commons-node");
const pip_services3_commons_node_6 = require("pip-services3-commons-node");
const pip_services3_commons_node_7 = require("pip-services3-commons-node");
const pip_services3_commons_node_8 = require("pip-services3-commons-node");
const ApplicationV1Schema_1 = require("../data/version1/ApplicationV1Schema");
class ApplicationsCommandSet extends pip_services3_commons_node_1.CommandSet {
    constructor(logic) {
        super();
        this._logic = logic;
        // Register commands to the database
        this.addCommand(this.makeGetApplicationsCommand());
        this.addCommand(this.makeGetApplicationByIdCommand());
        this.addCommand(this.makeCreateApplicationCommand());
        this.addCommand(this.makeUpdateApplicationCommand());
        this.addCommand(this.makeDeleteApplicationByIdCommand());
    }
    makeGetApplicationsCommand() {
        return new pip_services3_commons_node_2.Command("get_applications", new pip_services3_commons_node_5.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services3_commons_node_7.FilterParamsSchema())
            .withOptionalProperty('paging', new pip_services3_commons_node_8.PagingParamsSchema()), (correlationId, args, callback) => {
            let filter = pip_services3_commons_node_3.FilterParams.fromValue(args.get("filter"));
            let paging = pip_services3_commons_node_4.PagingParams.fromValue(args.get("paging"));
            this._logic.getApplications(correlationId, filter, paging, callback);
        });
    }
    makeGetApplicationByIdCommand() {
        return new pip_services3_commons_node_2.Command("get_application_by_id", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('application_id', pip_services3_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let application_id = args.getAsString("application_id");
            this._logic.getApplicationById(correlationId, application_id, callback);
        });
    }
    makeCreateApplicationCommand() {
        return new pip_services3_commons_node_2.Command("create_application", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('application', new ApplicationV1Schema_1.ApplicationV1Schema()), (correlationId, args, callback) => {
            let application = args.get("application");
            this._logic.createApplication(correlationId, application, callback);
        });
    }
    makeUpdateApplicationCommand() {
        return new pip_services3_commons_node_2.Command("update_application", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('application', new ApplicationV1Schema_1.ApplicationV1Schema()), (correlationId, args, callback) => {
            let application = args.get("application");
            this._logic.updateApplication(correlationId, application, callback);
        });
    }
    makeDeleteApplicationByIdCommand() {
        return new pip_services3_commons_node_2.Command("delete_application_by_id", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('application_id', pip_services3_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let applicationId = args.getAsNullableString("application_id");
            this._logic.deleteApplicationById(correlationId, applicationId, callback);
        });
    }
}
exports.ApplicationsCommandSet = ApplicationsCommandSet;
//# sourceMappingURL=ApplicationsCommandSet.js.map