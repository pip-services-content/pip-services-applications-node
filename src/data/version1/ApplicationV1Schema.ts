import { ObjectSchema } from 'pip-services3-commons-node';
import { ArraySchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';

export class ApplicationV1Schema extends ObjectSchema {
    public constructor() {
        super();
        this.withOptionalProperty('id', TypeCode.String);
        this.withRequiredProperty('name', TypeCode.Map);
        this.withOptionalProperty('description', TypeCode.Map);
        this.withRequiredProperty('product', TypeCode.String);
        this.withOptionalProperty('group', TypeCode.String);
        this.withOptionalProperty('copyrights', TypeCode.String);
        this.withOptionalProperty('url', TypeCode.String);
        this.withOptionalProperty('icon', TypeCode.String);
        this.withOptionalProperty('min_ver', TypeCode.Integer);
        this.withOptionalProperty('max_ver', TypeCode.Integer);
    }
}
