"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let Mixed = mongoose_1.Schema.Types.Mixed;
exports.ApplicationsMongoDbSchema = function (collection) {
    collection = collection || 'applications';
    let schema = new mongoose_1.Schema({
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
    }, {
        collection: collection,
        autoIndex: true
    });
    schema.set('toJSON', {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });
    return schema;
};
//# sourceMappingURL=ApplicationsMongoDbSchema.js.map