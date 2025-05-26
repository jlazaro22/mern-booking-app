"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// src/index.ts
var import_cookie_parser = __toESM(require("cookie-parser"));
var import_cors = __toESM(require("cors"));
var import_config = require("dotenv/config");
var import_express3 = __toESM(require("express"));
var import_path = __toESM(require("path"));

// src/lib/mongoose.ts
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

// src/routes/auth.ts
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
var import_mongoose2 = __toESM(require("mongoose"));
var userSchema = new import_mongoose2.default.Schema({
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
var User = import_mongoose2.default.model("User", userSchema);
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

// src/routes/users.ts
var import_express2 = require("express");
var import_express_validator3 = require("express-validator");
var import_jsonwebtoken3 = __toESM(require("jsonwebtoken"));
var router2 = (0, import_express2.Router)();
router2.post(
  "/register",
  userRegisterValidationSchema,
  async (req, res) => {
    const errors = (0, import_express_validator3.validationResult)(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ message: errors.array() });
      return;
    }
    try {
      let user = await user_default.findOne({ email: req.body.email });
      if (user) {
        res.status(400).json({ message: "User already exists" });
        return;
      }
      user = new user_default(req.body);
      await user.save();
      const token = import_jsonwebtoken3.default.sign(
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
      res.status(200).json({ message: "User registered OK" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);
var users_default = router2;

// src/index.ts
var host = process.env.HOST;
var port = Number(process.env.PORT);
mongooseConnect();
var app = (0, import_express3.default)();
app.use((0, import_cookie_parser.default)());
app.use((0, import_express3.json)());
app.use((0, import_express3.urlencoded)({ extended: true }));
app.use(
  (0, import_cors.default)({
    origin: process.env.FRONTEND_URL,
    credentials: true
  })
);
app.use(import_express3.default.static(import_path.default.join(__dirname, "../../frontend/dist")));
app.get("/api/test", (req, res) => {
  res.status(200).json({ message: "Hello from Express endpoint!" });
});
app.use("/api/auth", auth_default2);
app.use("/api/users", users_default);
app.listen(port, host, () => {
  console.log(`\u{1F680} Server is running on http://${host}:${port}`);
});
