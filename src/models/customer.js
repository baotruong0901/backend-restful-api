const mongoose = require("mongoose");
const mongoose_delete = require('mongoose-delete');

//quy định ‘hình thù’ data sẽ lưu vào database
const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    address: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
}, { timestamps: true }//createdAt, updatedAt
);

customerSchema.plugin(mongoose_delete);
customerSchema.plugin(mongoose_delete, { overrideMethods: 'all' });
//là công cụ giúp thao tác với database, ví dụ như Query
const Customer = mongoose.model("customer", customerSchema);

module.exports = Customer