import { CommandSet } from 'pip-services3-commons-node';
import { ICommand } from 'pip-services3-commons-node';
import { Command } from 'pip-services3-commons-node';
import { Schema } from 'pip-services3-commons-node';
import { Parameters } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { ObjectSchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';
import { FilterParamsSchema } from 'pip-services3-commons-node';
import { PagingParamsSchema } from 'pip-services3-commons-node';

import { ApplicationV1 } from '../data/version1/ApplicationV1';
import { ApplicationV1Schema } from '../data/version1/ApplicationV1Schema';
import { IApplicationsController } from './IApplicationsController';

export class ApplicationsCommandSet extends CommandSet {
    private _logic: IApplicationsController;

    constructor(logic: IApplicationsController) {
        super();

        this._logic = logic;

        // Register commands to the database
		this.addCommand(this.makeGetApplicationsCommand());
		this.addCommand(this.makeGetApplicationByIdCommand());
		this.addCommand(this.makeCreateApplicationCommand());
		this.addCommand(this.makeUpdateApplicationCommand());
		this.addCommand(this.makeDeleteApplicationByIdCommand());
    }

	private makeGetApplicationsCommand(): ICommand {
		return new Command(
			"get_applications",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema())
				.withOptionalProperty('paging', new PagingParamsSchema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let filter = FilterParams.fromValue(args.get("filter"));
                let paging = PagingParams.fromValue(args.get("paging"));
                this._logic.getApplications(correlationId, filter, paging, callback);
            }
		);
	}

	private makeGetApplicationByIdCommand(): ICommand {
		return new Command(
			"get_application_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('application_id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let application_id = args.getAsString("application_id");
                this._logic.getApplicationById(correlationId, application_id, callback);
            }
		);
	}

	private makeCreateApplicationCommand(): ICommand {
		return new Command(
			"create_application",
			new ObjectSchema(true)
				.withRequiredProperty('application', new ApplicationV1Schema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let application = args.get("application");
                this._logic.createApplication(correlationId, application, callback);
            }
		);
	}

	private makeUpdateApplicationCommand(): ICommand {
		return new Command(
			"update_application",
			new ObjectSchema(true)
				.withRequiredProperty('application', new ApplicationV1Schema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let application = args.get("application");
                this._logic.updateApplication(correlationId, application, callback);
            }
		);
	}
	
	private makeDeleteApplicationByIdCommand(): ICommand {
		return new Command(
			"delete_application_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('application_id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let applicationId = args.getAsNullableString("application_id");
                this._logic.deleteApplicationById(correlationId, applicationId, callback);
			}
		);
	}

}