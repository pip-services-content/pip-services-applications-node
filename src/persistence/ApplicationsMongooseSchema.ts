import { Schema } from 'mongoose';
let Mixed = Schema.Types.Mixed;

export let ApplicationsMongooseSchema = function(collection?: string) {
    collection = collection || 'applications';

    let schema = new Schema(
        {
            /* Identification */
            _id: { type: String, required: true, unique: true },
            
            /* Content */
            name: { type: Mixed, required: true },
            description: { type: Mixed, required: false },
            product: { type: String, required: true },
            group: { type: String, required: false },
            copyrights: { type: String, required: false },
            url: { type: String, required: false },
            icon: { type: String, required: false },
            min_ver: { type: Number, required: false },
            max_ver: { type: Number, required: false }
        },
        {
            collection: collection,
            autoIndex: true
        }
    );

    schema.set('toJSON', {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });

    return schema;
}
