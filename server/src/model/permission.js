const mongoose = require('mongoose');

var PermissionSchema = new mongoose.Schema({
  uid: { type: String },
  isInsert: { type: Boolean, default: true },
  isDelete: { type: Boolean, default: true },
  isUpdate: { type: Boolean, default: true },
  isQuery: { type: Boolean, default: true },
})

var Permission = mongoose.model('permission', PermissionSchema)

module.exports = Permission;