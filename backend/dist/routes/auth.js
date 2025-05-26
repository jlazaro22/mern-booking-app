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

// src/routes/auth.ts
var auth_exports = {};
__export(auth_exports, {
  default: () => auth_default2
});
module.exports = __toCommonJS(auth_exports);
var import_bcryptjs2 = __toESM(require("bcryptjs"));
var import_express = require("express");
var import_express_validator2 = require("express-validator");
var import_jsonwebtoken2 = __toESM(require("jsonwebtoken"));

// src/middleware/auth.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
function verifyToken(req, res, next) {
  const token = req.cookies["auth_token"];
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  try {
    const decodedToken = import_jsonwebtoken.default.verify(
      token,
      process.env.JWT_SECRET_KEY
    );
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
}
var auth_default = verifyToken;

// src/models/user.ts
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

// src/routes/auth.ts
var router = (0, import_express.Router)();
router.post(
  "/login",
  userLoginValidationSchema,
  async (req, res) => {
    const errors = (0, import_express_validator2.validationResult)(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ message: errors.array() });
      return;
    }
    const { email, password } = req.body;
    try {
      const user = await user_default.findOne({ email });
      if (!user) {
        res.status(400).json({ message: "Invalid credentials" });
        return;
      }
      const isPasswordValid = await import_bcryptjs2.default.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(400).json({ message: "Invalid credentials" });
        return;
      }
      const token = import_jsonwebtoken2.default.sign(
        { userId: user._id },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "1d"
        }
      );
      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 864e5
        // 1 day,
      });
      res.status(200).json({ userId: user._id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);
router.get("/validate-token", auth_default, (req, res) => {
  res.status(200).json({ userId: req.userId });
});
router.post("/logout", (req, res) => {
  res.cookie("auth_token", "", {
    expires: /* @__PURE__ */ new Date(0)
  });
  res.send();
});
var auth_default2 = router;
