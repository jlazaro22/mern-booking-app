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

// src/lib/mongoose.ts
var mongoose_exports = {};
__export(mongoose_exports, {
  default: () => mongooseConnect
});
module.exports = __toCommonJS(mongoose_exports);
var import_mongoose = __toESM(require("mongoose"));
function mongooseConnect() {
  const db = process.env.MONGODB_CONNECTION_STRING;
  const environment = process.env.NODE_ENV;
  if (!db) {
    throw new Error("Missing MONGODB_CONNECTION_STRING environment variable");
  }
  if (environment === "development") {
    import_mongoose.default.connect(db, { dbName: "app-db" }).then(() => {
      console.log("\u2705 Connected to MongoDB: ", db);
    });
  } else if (environment === "test") {
    import_mongoose.default.connect(db, { dbName: "app-e2e-test-db" }).then(() => {
      console.log("\u2705 Connected to MongoDB: ", db);
    });
  } else {
    import_mongoose.default.connect(db, { dbName: "app-db" }).then(() => {
      console.log("\u2705 Connected to MongoDB");
    });
  }
}
