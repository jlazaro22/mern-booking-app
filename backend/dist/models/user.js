"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/models/user.ts
var user_exports = {};
__export(user_exports, {
  default: () => user_default,
  userLoginValidationSchema: () => userLoginValidationSchema,
  userRegisterValidationSchema: () => userRegisterValidationSchema
});
module.exports = __toCommonJS(user_exports);
var import_bcryptjs = __toESM(require("bcryptjs"));
var import_express_validator = require("express-validator");
var import_mongoose = __toESM(require("mongoose"));
var userSchema = new import_mongoose.default.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true }
});
userSchema.pre("save", async function(next) {
  if (this.isModified("password")) {
    this.password = await import_bcryptjs.default.hash(this.password, 8);
  }
  next();
});
var userRegisterValidationSchema = [
  (0, import_express_validator.check)("firstName", "First name is required").isString().not().isEmpty(),
  (0, import_express_validator.check)("lastName", "Last name is required").isString().not().isEmpty(),
  (0, import_express_validator.check)("email", "Email is required").isEmail().not().isEmpty(),
  (0, import_express_validator.check)("password", "Password with 6 or more characters required").isLength({
    min: 6
  })
];
var userLoginValidationSchema = [
  (0, import_express_validator.check)("email", "Email is required").isEmail().not().isEmpty(),
  (0, import_express_validator.check)("password", "Password with 6 or more characters required").isLength({
    min: 6
  })
];
var User = import_mongoose.default.model("User", userSchema);
var user_default = User;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  userLoginValidationSchema,
  userRegisterValidationSchema
});
