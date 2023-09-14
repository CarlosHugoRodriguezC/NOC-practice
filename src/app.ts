import { Server } from "./presentation/server";
import { envs } from "./config/plugins/env.plugin";
import { LogModel, MongoDatabase } from "./data/mongo";

(async () => {
  main();
})();

async function main() {
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URI,
    dbName: envs.MONGO_DB_NAME,
  });

  // const newLog = await LogModel.create({
  //   message: "Test message from mongo",
  //   level: "low",
  //   origin: "app.ts",
  // });

  // await newLog.save();

  // console.log(newLog);

  // const logs = await LogModel.find();

  // console.log(logs);

  // Server.start();
  // console.log(envs.MAILER_EMAIL);
}
