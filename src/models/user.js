const mongoose = require("mongoose");
const mongoose_delete = require('mongoose-delete');
//quy định ‘hình thù’ data sẽ lưu vào database
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    city: String
});
userSchema.plugin(mongoose_delete, { overrideMethods: 'all' });
//là công cụ giúp thao tác với database, ví dụ như Query
const User = mongoose.model("user", userSchema);
module.exports = User
