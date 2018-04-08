import { Descriptor } from 'pip-services-commons-node';
import { CommandableLambdaFunction } from 'pip-services-aws-node';
import { ApplicationsServiceFactory } from '../build/ApplicationsServiceFactory';

export class ApplicationsLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("applications", "Applications function");
        this._dependencyResolver.put('controller', new Descriptor('pip-services-applications', 'controller', 'default', '*', '*'));
        this._factories.add(new ApplicationsServiceFactory());
    }
}

export const handler = new ApplicationsLambdaFunction().getHandler();