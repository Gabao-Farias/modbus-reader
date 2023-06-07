import { CronJob } from "cron";
import { Console, Sys } from "./classes";
import Config from "./classes/Config";
import Server from "./classes/Server";

const console = new Console("Global");

const start = async () => {
  const sys = new Sys();

  if (!sys.isValidOS())
    throw new Error(
      "At the moment, Linux is the only platform supported to run the app!"
    );

  const cf = new Config();

  const config = await cf.loadConfiguration();

  const { cron } = config;

  const server = new Server(config);

  if (cron) {
    console.contextLog(`Cron setup has been found! ${cron}`);
    console.contextLog("Standby for the cron trigger to initiate process...");

    const job = new CronJob(cron, () => {
      console.contextLog("Cron triggered, starting cron job...");

      server.startReadIteration();

      console.contextLog("Finished cron job execution!");

      console.contextLog("Standby for the cron trigger to initiate process...");
    });

    job.start();
  } else {
    console.contextLog("No cron setup has been found!");
    console.contextLog("Starting directly the execution...");

    await server.startReadIteration();
  }
};

start();
