import "dotenv/config";
import * as env from "env-var";

export const envs = {
  PORT: env.get("PORT").required().asPortNumber(),

  // Mailer
  MAILER_SERVICE: env.get("MAILER_SERVICE").required().asString(),
  MAILER_EMAIL: env.get("MAILER_EMAIL").required().asEmailString(),
  MAILER_SECRET_KEY: env.get("MAILER_SECRET_KEY").required().asString(),

  // Mongo DB
  MONGO_URI: env.get("MONGO_URI").required().asString(),
  MONGO_DB_NAME: env.get("MONGO_DB_NAME").required().asString(),
  MONGO_USER: env.get("MONGO_USER").required().asString(),
  MONGO_PASSWORD: env.get("MONGO_PASSWORD").required().asString(),

  // environment
  PROD: env.get("PROD").required().asBool(),
};
