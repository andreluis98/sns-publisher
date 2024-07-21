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
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/server.ts
var import_express = __toESM(require("express"));
var import_zod = require("zod");
var import_aws_sdk = require("aws-sdk");
var app = (0, import_express.default)();
app.use(import_express.default.json());
app.post("/nfe", (req, res) => __async(exports, null, function* () {
  const requestBodySchema = import_zod.z.object({
    url: import_zod.z.string().url()
  });
  try {
    const { url } = requestBodySchema.parse(req.body);
    const sns = new import_aws_sdk.SNS({
      region: "us-east-1"
    });
    const { MessageId } = yield sns.publish({
      Message: JSON.stringify({ url }),
      TopicArn: process.env.AWS_TOPIC_ARN,
      MessageGroupId: "01"
    }).promise();
    if (!MessageId) {
      throw Error("Falha ao publicar mensagem SNS");
    }
    return res.status(201).json({ success: true });
  } catch (err) {
    console.log(err);
    if (err instanceof import_zod.ZodError) {
      return res.status(400).json({
        message: err.format()
      });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
  return res.status(200).json({
    message: "Hello World"
  });
}));
app.listen(Number(process.env.PORT), () => {
  console.log(`Aplica\xE7\xE3o rodando na porta ${process.env.PORT}`);
});
